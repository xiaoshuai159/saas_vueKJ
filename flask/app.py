# coding=utf-8
"""
项目后端启动程序
"""
import json
from flask import Flask, request, session, redirect, flash, g, url_for
# from werkzeug.security import generate_password_hash
from flask_cors import CORS
# from login import login_page
from User import USERS, User
# from jwt_token import genToken, verifyToken

app = Flask(__name__)
CORS(app=app)
# app.register_blueprint(login_page)
app.config['SECRET_KEY'] = 'secret123'


@app.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        user = [u for u in USERS if u.get('id') == int(session['user_id'])]
        g.user = user


@app.route('/hello')
def hello():
    if not g.user:
        return redirect(url_for("index"))
    returnData = {'code': 0, 'msg': 'success', 'data': 'hello {}'.format(g.user)}
    return json.dumps(returnData), 200


@app.route('/index')
def index():
    return ""


@app.route('/login_in', methods=['POST'])
def login_in():
    print(request.data, request.url)
    req_data = json.loads(bytes.decode(request.data))
    print(req_data)
    if request.method == 'POST':
        session.pop('user_id', None)
        # username = request.form['login_user']
        # passwd = request.form['login_passwd']
        username = req_data['login_user']
        passwd = req_data['login_passwd']
        user = User.queryUser(username)
        user_info = user.get(user.get_id())
        if user is not None and user.verifyPasswd(passwd):
            returnData = {'code': 200, 'msg': 'success'}
            returnData.update(user_info)
            session['user_id'] = user.get_id()
            return json.dumps(returnData), 200
        else:
            returnData = {'code': 400, 'msg': 'failure', 'data': 'user wrong'}
            return json.dumps(returnData), 200


@app.route('/login_out', methods=['POST'])
def login_out():
    req_data = json.loads(str(request.data))
    user_name = req_data.get("login_out_user")
    user_id = User.queryUser(user_name).get_id()
    session_id = session['user_id']
    # print(user_id)
    # print(session_id)
    if user_id is not None and user_id == int(session_id):
        returnData = {'code': 0, 'msg': 'success', 'data': 'user: {} login out'.format(user_id)}
        session.clear()
        return json.dumps(returnData), 200
    else:
        returnData = {'code': 400, 'msg': 'failure', 'data': 'wrong login out action'}
        return json.dumps(returnData), 200


if __name__ == '__main__':
    app.run()
