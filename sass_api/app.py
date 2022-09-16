# coding=utf-8
"""
项目后端启动程序
"""
from email import utils
import uuid
import json
from io import BytesIO
from index import indexes
from flask import Flask, render_template, request, session, redirect, g, url_for, make_response, send_from_directory
from flask_cors import CORS
# from flask_session import Session
from User import USERS, User

from utils import map_data, simple_data, details_data, verify_codes
app = Flask(__name__)
# , static_folder="./dist",
#             template_folder="./dist", static_url_path="/"
app.config['SECRET_KEY'] = str(uuid.uuid4())
app.config['SESSION_PERMANENT'] = False  # session是否长期有效，false，则关闭浏览器，session失效
app.config['PERMANENT_SESSION_LIFETIME'] = 3600
CORS(app=app)


@app.before_request
def before_request():
    """
    每次请求接口之前验证当前的登录状态
    :return: None
    """
    # print(session)
    g.user = None
    if 'user_id' in session:
        user = [u for u in USERS if u.get('id') == int(session['user_id'])]
        g.user = user[0]
    # if g.user is not None:
    #     req_data = json.loads(bytes.decode(request.data))
    #     data = req_data.get('data')
    #     if 'data' in req_data.keys():
    #         if session['user_level'] == 2 and data[0] == '':
    #             redirect(url_for("index"))
    #         if session['user_level'] == 3 and data[1] == '':
    #             redirect(url_for("index"))
    #         if session['user_level'] == 4 and data[2] == '':
    #             redirect(url_for("index"))


@app.route('/index', methods=['GET'])
def index():
    """
    测试主页
    :return: Hello
    """
    return app.send_static_file("index.html")


# @indexes.route('/index', methods=['GET'])
# def index():
#     """
#     测试主页
#     :return: Hello
#     """
#     return indexes.send_static_file('index.html')


@app.route('/hello')
def hello():
    """
    登录后才能访问的测试接口，未登录会重定向到index界面
    :return: json格式返回hello信息
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))
    # print(g.user)
    hello_rep_data = {'code': 0, 'msg': 'success', 'data': 'hello {}'.format(g.user.get("login_user"))}
    return json.dumps(hello_rep_data), 200


@app.route('/verify_code')
def verify_code():
    """
    生成验证码
    :return:
    """
    image, code = verify_codes.generate_image(4)
    # 图片以二进制形式写入
    buf = BytesIO()
    image.save(buf, 'jpeg')
    buf_str = buf.getvalue()
    # 把buf_str作为response返回前端，并设置首部字段
    response = make_response(buf_str)
    response.headers['Content-Type'] = 'image/gif'
    # 将验证码字符串储存在session中
    session['imageCode'] = str.lower(code)
    return response


@app.route('/login_in', methods=['POST'])
def login_in():
    """
    登录接口，接收登录名后，验证密码是否正确，创建session
    :return: json格式返回
    """
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("login_in requests", request.data)
    if request.method == 'POST':
        session.pop('user_id', None)
        username = req_data['login_user']
        passwd = req_data['login_passwd']
        code = str.lower(req_data['code'])
        print(session)
        if code != session['imageCode']:
            return json.dumps({'code': 401, 'msg': 'failure', 'data': 'wrong verify code'}), 400
        user = User.queryUser(username)
        user_info = user.get(user.get_id())
        if user is not None and user.verifyPasswd(passwd):
            login_in_rep_data = {'code': 200, 'msg': 'success'}
            login_in_rep_data.update(user_info)
            session['user_id'] = user.get_id()
            session['user_level'] = user.user_level
            return json.dumps(login_in_rep_data), 200
        else:
            login_in_rep_data = {'code': 402, 'msg': 'failure', 'data': 'user or passwd wrong'}
            return json.dumps(login_in_rep_data), 400


@app.route('/login_out', methods=['POST'])
def login_out():
    """
    退出登录请求，验证用户名后，清空session
    :return: json格式返回信息
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("login out requests {}".format(req_data))
    user_info = req_data.get("user_info")
    username = user_info.get("login_user")
    user_id = User.queryUser(username).get_id()
    try:
        session_id = session['user_id']
    except Exception as e:
        login_out_rep_data = {'code': 400, 'msg': 'failure',
                              'data': 'wrong login out action, does not exists this user id in session'}
        return json.dumps(login_out_rep_data), 200
    if user_id is not None and user_id == int(session_id):
        print(username)
        login_out_rep_data = {'code': 200, 'msg': 'success', 'data': 'user: {} login out'.format(username)}
        session.clear()
        return json.dumps(login_out_rep_data), 200
    else:
        login_out_rep_data = {'code': 400, 'msg': 'failure', 'data': 'wrong login out action'}
        return json.dumps(login_out_rep_data), 200


@app.route('/map_info', methods=['GET', 'POST'])
def map_info():
    """
    地图右侧: 三个数量的显示
    :return:
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("map_info requests", req_data)
    try:
        s_time, e_time, data = req_data.get('s_time'), req_data.get('e_time'), req_data.get('data')
    except Exception as e:
        return json.dumps({'code': 400, 'msg': 'failure', 'data': 'key parse wrong'}), 200
    return json.dumps(map_data.get_map_info(s_time=s_time, e_time=e_time, data=data), ensure_ascii=False),200
    # return json.dumps()


@app.route('/map_ip_data', methods=['GET', 'POST'])
def map_ip_data():
    """
    地图数据：IP模式接口
    :return: json_data: [{name:"", value: ""},......]
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("map_ip_data requests", req_data)
    try:
        s_time, e_time, data = req_data.get('s_time'), req_data.get('e_time'), req_data.get('data')
    except Exception as e:
        return json.dumps({'code': 400, 'msg': 'failure', 'data': 'key parse wrong'}), 200
    return json.dumps(map_data.get_ip_num_data(s_time=s_time, e_time=e_time, data=data), ensure_ascii=False), 200
    # return json.dumps(num_data.get_ip_num_data(), ensure_ascii=False)


@app.route('/map_unit_data', methods=['GET', 'POST'])
def map_unit_data():
    """
    地图数据：单位模式接口
    :return: json_data: [{name:"", value: ""},......]
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))

    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("map_event_data requests", req_data)
    try:
        s_time, e_time, data = req_data.get('s_time'), req_data.get('e_time'), req_data.get('data')
    except Exception as e:
        return json.dumps({'code': 400, 'msg': 'failure', 'data': 'key parse wrong'}), 200
    return json.dumps(map_data.get_unit_num_data(s_time=s_time, e_time=e_time, data=data), ensure_ascii=False), 200
    # return json.dumps(map_data.get_event_num_data(), ensure_ascii=False)


@app.route('/simple_unit_data', methods=['GET', 'POST'])
def simple_unit_data():
    """
    事件概览: 单位数量排名前三数据接口
    :return: json_data: [{"province": , "num": },......]
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("simple_unit_data requests", req_data)
    try:
        s_time, e_time, data = req_data.get('s_time'), req_data.get('e_time'), req_data.get('data')
    except Exception as e:
        return json.dumps({'code': 400, 'msg': 'failure', 'data': 'key parse wrong'}), 200
    return json.dumps(simple_data.get_unit_num_data(s_time=s_time, e_time=e_time, data=data), ensure_ascii=False), 200


@app.route('/simple_event_data', methods=['GET', 'POST'])
def simple_event_data():
    """
    事件概览: 单位数量排名前三数据接口
    :return: json_data: [{"province": , "num": },......]
    """
    # if 'user_info' not in session:
    #     return redirect(url_for("index"))
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("simple_event_data requests", req_data)
    try:
        s_time, e_time, data = req_data.get('s_time'), req_data.get('e_time'), req_data.get('data')
    except Exception as e:
        return json.dumps({'code': 400, 'msg': 'failure', 'data': 'key parse wrong'}), 200
    return json.dumps(simple_data.get_event_num_data(s_time, e_time, data), ensure_ascii=False), 200


@app.route('/details', methods=['GET', 'POST'])
def details():
    # if "user_info" not in session:
    #     return redirect(url_for("index"))
    req_data = json.loads(bytes.decode(request.data))
    # req_data = request.form
    print("details requests {}".format(req_data))
    try:
        s_time, e_time, data = req_data.get('s_time'), req_data.get('e_time'), req_data.get('data')
    except Exception as e:
        return json.dumps({'code': 400, 'msg': 'failure', 'data': 'key parse wrong'}), 200
    return json.dumps(details_data.get_details(), ensure_ascii=False), 200


@app.route('/export_paper', methods=['GET', 'POST'])
def export_paper():
    """
    导出功能函数
    :return:
    """
    # if "user_info" not in session:
    #     return redirect(url_for("index"))
    req_data = request.args.to_dict()
    print("export paper requests", req_data)
    return send_from_directory(directory=r"F:\python\projects\sass_api\download",
                               path=r"F:\python\projects\sass_api\download",
                               filename="important_area_res.zip", as_attachment=True), 200


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
    # app.run(debug=True)


# event_type = {"BlackMoon": "“BlackMoon”木马", "LemonDuck": "“LemonDuck”组织木马",
#               "Miori": "“Mozi”木马", "OceanLotus": "“海莲花（OceanLotus）”APT组织木马",
#               "Kworkers": "“Kworkers”挖矿木马", "Mirai": "“Mirai”木马"}
