# coding=utf-8
"""
事件概览数据获取函数
"""
import time
from utils.funcs import simple_event_body_, map_unit_body_
from utils.config import es_query


test_num_data1 = [{"province": "北京", "num": 120}, {"province": "广东", "num": 110}, {"province": "浙江", "num": 105}, {"province": "杭州", "num": 97}, {"province": "重庆", "num": 85}, {"province": "辽宁", "num": 70}, {"province": "吉林", "num": 65}, {"province": "内蒙古", "num": 51}, {"province": "贵州", "num": 37}, {"province": "新疆", "num": 11}]
test_num_data2 = [{"province": "河北", "num": 52}, {"province": "广东", "num": 48}, {"province": "北京", "num": 36},{"province": "浙江", "num": 35}, {"province": "杭州", "num": 27}, {"province": "重庆", "num": 25}, {"province": "辽宁", "num": 20}, {"province": "吉林", "num": 15}, {"province": "贵州", "num": 5}, {"province": "新疆", "num": 1}]


def quer_args(s_time, e_time, data):
    """
    请求体参数
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param data: 地理信息
    :return: 起始时间, 结束时间, 省份/城市/区县, 行政代码
    """
    st = time.strftime("%Y%m%d000000", time.strptime(s_time, "%Y-%m-%d"))
    et = time.strftime("%Y%m%d999999", time.strptime(e_time, "%Y-%m-%d"))
    adcode = data[3]
    return st, et, data[:3], adcode


def get_unit_num_data(s_time: str, e_time: str, data: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param data: 查询地区条件
    :return: list类型数据[{name:"", value: "", ......}]
    """
    # s_time, e_time, address, adcode = quer_args(s_time, e_time, data)
    # # 请求es数据
    # s_time = int(time.mktime(time.strptime(s_time, "%Y%m%d%H%M%S")))
    # e_time = int(time.mktime(time.strptime(e_time, "%Y%m%d%H%M%S")))
    # body = map_unit_body_(s_time, e_time, address)
    # es_res = es_query(query_body=body, index_name="unit_names")

    ip_data = []
    for d in test_num_data1:
        ip_data.append("")
    return test_num_data1


def get_event_num_data(s_time: str, e_time: str, data: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param data: 查询地区条件
    :return: list类型数据[{name:"", value: "", ......}]
    """
    # s_time, e_time, address, adcode = quer_args(s_time, e_time, data)
    # # 请求es数据
    # body = simple_event_body_(s_time, e_time, address)
    # es_res = es_query(query_body=body)

    event_data = []
    for d in test_num_data2:
        event_data.append("")
    return test_num_data2


# 测试调用
# print(get_ip_num_data())
# print(get_event_num_data())
