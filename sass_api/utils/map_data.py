# coding=utf-8
"""
地图数据概览函数
"""
import time
import json
from utils.funcs import map_ip_body_, map_unit_body_
from utils.config import es_query


test_num_data = [{u'distinct_sip': {u'value': 5161}, u'key': u'\u5e7f\u4e1c\u7701', u'doc_count': 164083},
                 {u'distinct_sip': {u'value': 880}, u'key': u'\u5317\u4eac\u5e02', u'doc_count': 129072}, {u'distinct_sip': {u'value': 829}, u'key': u'\u4e0a\u6d77\u5e02', u'doc_count': 89868}, {u'distinct_sip': {u'value': 4837}, u'key': u'\u6c5f\u82cf\u7701', u'doc_count': 62451}, {u'distinct_sip': {u'value': 5133}, u'key': u'\u5c71\u4e1c\u7701', u'doc_count': 62136}, {u'distinct_sip': {u'value': 3738}, u'key': u'\u6d59\u6c5f\u7701', u'doc_count': 59319}, {u'distinct_sip': {u'value': 1943}, u'key': u'\u6e56\u5357\u7701', u'doc_count': 44921}, {u'distinct_sip': {u'value': 677}, u'key': u'\u5929\u6d25\u5e02', u'doc_count': 42739}, {u'distinct_sip': {u'value': 2143}, u'key': u'\u56db\u5ddd\u7701', u'doc_count': 41555}, {u'distinct_sip': {u'value': 1504}, u'key': u'\u9655\u897f\u7701', u'doc_count': 39595}, {u'distinct_sip': {u'value': 3214}, u'key': u'\u6cb3\u5317\u7701', u'doc_count': 30831}, {u'distinct_sip': {u'value': 3716}, u'key': u'\u6cb3\u5357\u7701', u'doc_count': 28647}, {u'distinct_sip': {u'value': 1723}, u'key': u'\u5409\u6797\u7701', u'doc_count': 28475}, {u'distinct_sip': {u'value': 1885}, u'key': u'\u8fbd\u5b81\u7701', u'doc_count': 24238}, {u'distinct_sip': {u'value': 1891}, u'key': u'\u6e56\u5317\u7701', u'doc_count': 20990}, {u'distinct_sip': {u'value': 1201}, u'key': u'\u8d35\u5dde\u7701', u'doc_count': 19346}, {u'distinct_sip': {u'value': 13}, u'key': u'\u4e2d\u56fd\u53f0\u6e7e', u'doc_count': 15415}, {u'distinct_sip': {u'value': 386}, u'key': u'\u7518\u8083\u7701', u'doc_count': 12055}, {u'distinct_sip': {u'value': 1277}, u'key': u'\u798f\u5efa\u7701', u'doc_count': 11567}, {u'distinct_sip': {u'value': 1823}, u'key': u'\u6c5f\u897f\u7701', u'doc_count': 11266}, {u'distinct_sip': {u'value': 1853}, u'key': u'\u5b89\u5fbd\u7701', u'doc_count': 11104}, {u'distinct_sip': {u'value': 1239}, u'key': u'\u91cd\u5e86\u5e02', u'doc_count': 11100}, {u'distinct_sip': {u'value': 1168}, u'key': u'\u4e91\u5357\u7701', u'doc_count': 10600}, {u'distinct_sip': {u'value': 790}, u'key': u'\u5185\u8499\u53e4\u81ea\u6cbb\u533a', u'doc_count': 8560}, {u'distinct_sip': {u'value': 1372}, u'key': u'\u9ed1\u9f99\u6c5f\u7701', u'doc_count': 8450}, {u'distinct_sip': {u'value': 1589}, u'key': u'\u5c71\u897f\u7701', u'doc_count': 7802}, {u'distinct_sip': {u'value': 1599}, u'key': u'\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a', u'doc_count': 7576}, {u'distinct_sip': {u'value': 98}, u'key': u'\u897f\u85cf\u81ea\u6cbb\u533a', u'doc_count': 2290}, {u'distinct_sip': {u'value': 646}, u'key': u'\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a', u'doc_count': 2088}, {u'distinct_sip': {u'value': 232}, u'key': u'\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a', u'doc_count': 1332}, {u'distinct_sip': {u'value': 167}, u'key': u'\u9752\u6d77\u7701', u'doc_count': 574}, {u'distinct_sip': {u'value': 155}, u'key': u'\u6d77\u5357\u7701', u'doc_count': 549}, {u'distinct_sip': {u'value': 26}, u'key': u'\u4e2d\u56fd\u9999\u6e2f', u'doc_count': 423}]
test_info = [{"area_num": 34}, {"unit_num": 2102}, {"ip_num": 22489}]


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


def get_ip_num_data(s_time: str, e_time: str, data: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param data: 查询地区条件
    :return: list类型数据[{name:"", value: "", ......}]
    """
    # s_time, e_time, address, adcode = quer_args(s_time, e_time, data)
    # # 请求es数据
    # body = map_ip_body_(s_time, e_time, address)
    # es_res = es_query(query_body=body, index_name="apt_")
    # print(es_res)

    ip_data = []
    for d in test_num_data:
        ip_data.append({"name": d['key'], "value": d['distinct_sip']['value']})
    return ip_data


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
    # print(es_res)
    event_data = []
    # for d in test_num_data:
    #     event_data.append({"name": d['key'], "value": d['doc_count']})
    return event_data


def get_map_info(s_time: str, e_time: str, data: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param data: 查询地区条件
    :return: list类型数据[{name:"", value: "", ......}]
    """
    # s_time, e_time, address, adcode = quer_args(s_time, e_time, data)
    # # 请求es数据
    # body1 = map_ip_body_(s_time, e_time, address)
    # es_res1 = es_query(query_body=body1, index_name="apt_")
    # s_time = int(time.mktime(time.strptime(s_time, "%Y%m%d%H%M%S")))
    # e_time = int(time.mktime(time.strptime(e_time, "%Y%m%d%H%M%S")))
    # body2 = map_unit_body_(s_time, e_time, address)
    # es_res2 = es_query(query_body=body2, index_name="unit_names")

    num_data = []
    for d in test_num_data:
        num_data.append("")
    return test_info

# 测试调用
# print(get_ip_num_data())
# print(get_event_num_data())
