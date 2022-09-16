# coding=utf-8
"""
部分通用变量和配置
"""
import random
import json
import requests
from elasticsearch import Elasticsearch
from elasticsearch import helpers

es_hosts = [{"host": '10.35.206.28', "port": 9200},
            {"host": '10.35.206.27', "port": 9200},
            {"host": '10.35.206.30', "port": 9200}]


headers = {'Content-Type': "application/json"}


def es_query(query_body: dict, index_name: str):

    """
    :param index_name: 查询的es表格名称
    :param query_body: 传入查询请求的body体
    :return: 查询结果
    """
    # es = Elasticsearch(hosts=es_hosts)
    # es_result = helpers.scan(
    #     client=es,
    #     query=query_body,
    #     index='apt_*',
    #     doc_type='apt_event',
    #     preserve_order=True,
    #     scroll='2m',
    # )  # helpers.scan的方式会产生历史快照，即查询结果留存，默认时间为5分钟

    es_url_info = random.choice(es_hosts)
    es_url = "http://{}:{}/{}*/_search".format(es_url_info.get('host'), es_url_info.get('port'), index_name)
    res = requests.get(url=es_url, headers=headers, data=json.dumps(query_body))
    return res


def docx_create():
    """
    文件下载函数
    :return:
    """
    hosts_info = random.choice(es_hosts)
    # print(hosts_info)
    req_url = 'http://{}:{}/'.format(hosts_info['host'], hosts_info['port'])
    # print(req_url)
    # req = requests.get("{}/apt_*/apt_event/{}".format(req_url, _id))
