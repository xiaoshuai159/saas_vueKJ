# coding=utf-8
"""
通用工具函数库,主要是与数据库交互的部分
"""
import random
from hashlib import md5


def map_ip_body_(s_time: str, e_time: str, address: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param address: 地理位置
    :param adcode: 行政区划代码
    :return: ip_num_body: type dict
    """
    addrs = {'province': address[0], 'city': address[1], 'district': address[2]}
    area, must_area, args = '', '', ''
    if address[0] == '':
        area, must_area, args = 'province', '', ''
    else:
        if address[0] != '':
            area, must_area, args = 'city', 'province', addrs.get('province')
        if address[1] != '':
            area, must_area, args = 'district', 'city', addrs.get('city')
        if address[2] != '':
            area, must_area, args = 'district', 'district', addrs.get('district')
    ip_num_body = {
      "size": 0,
      "aggs": {
        "group_by_area": {
          "terms": {
            "field": "{}.keyword".format(area),
            "size": 10000
          },
          "aggs": {
            "distinct_sip": {
              "cardinality": {
                "field": "sip.keyword"
              }
            }
          }
        }
      },
      "query": {
        "bool": {
          "must": [

          ],
          "filter": [
            {
              "range": {
                "ntime": {
                  "gte": "{}".format(s_time),
                  "lte": "{}".format(e_time)
                }
              }
            }
          ],
          "must_not": [
            {
              "match_phrase": {
                "adcode.keyword": ""
              }
            }
          ]
        }
      }
    }
    # print(area)
    if args != '':
        ip_num_body['query']['bool']['must'].extend([{"match_phrase": {"{}.keyword".format(must_area): "{}".format(args)}}])
    return ip_num_body


def map_unit_body_(s_time: int, e_time: int, address: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param address: 地理位置
    :param adcode: 行政区划代码
    :return: event_num_body: type dict
    """
    addrs = {'province': address[0], 'city': address[1], 'district': address[2]}
    area, must_area, args = '', '', ''
    if address[0] == '':
        area, must_area, args = 'province', '', ''
    else:
        if address[0] != '':
            area, must_area, args = 'city', 'province', addrs.get('province')
        if address[1] != '':
            area, must_area, args = 'district', 'city', addrs.get('city')
        if address[2] != '':
            area, must_area, args = 'district', 'district', addrs.get('district')
    map_unit_body = {
        "size": 0,
        "aggs": {
            "group_by_area": {
                "terms": {
                    "field": "{}.keyword".format(area),
                    "size": 10000
                },
                "aggs": {
                    "distinct_unit": {
                        "cardinality": {
                            "field": "unit.keyword"
                        }
                    }
                }
            }
        },
        "query": {
            "bool": {
                "must": [

                ],
                "filter": [
                    {
                        "range": {
                            "ntime": {
                                "gte": "{}".format(s_time),
                                "lte": "{}".format(e_time)
                            }
                        }
                    }
                ],
                "must_not": [
                    {
                        "match_phrase": {
                            "adcode.keyword": ""
                        }
                    }
                ]
            }
        }
    }
    if args != '':
        map_unit_body['query']['bool']['must'].extend([{"match_phrase": {"{}.keyword".format(must_area): "{}".format(args)}}])
    return map_unit_body


def map_info_body_(s_time: str, e_time: str, address: list):
    """
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param address: 地理位置
    :param adcode: 行政区划代码
    :return: event_num_body: type dict
    """
    map_info_body = {

    }
    return map_info_body


def simple_unit_body_():
    simple_unit_body = {

    }
    return simple_unit_body


def simple_event_body_(s_time: str, e_time: str, address: list):
    """

    :param s_time:
    :param e_time:
    :param address:
    :return:
    """
    addrs = {'province': address[0], 'city': address[1], 'district': address[2]}
    area, must_area, args = '', '', ''
    if address[0] == '':
        area, must_area, args = 'province', '', ''
    else:
        if address[0] != '':
            area, must_area, args = 'city', 'province', addrs.get('province')
        if address[1] != '':
            area, must_area, args = 'district', 'city', addrs.get('city')
        if address[2] != '':
            area, must_area, args = 'district', 'district', addrs.get('district')
    simple_event_body = {
      "size": 0,
      "aggs": {
        "group_by_area": {
          "terms": {
            "field": "{}.keyword".format(area),
            "size": 10000
          },
          "aggs": {
              "group_by_area": {
                  "terms": {
                      "field": "{}.keyword".format(area),
                      "size": 10000
                  },
                  "aggs": {
                      "distinct_sip": {
                          "cardinality": {
                              "field": "sip.keyword"
                          }
                      }
                  }
              }
          }
        }
      },
      "query": {
        "bool": {
          "must": [

          ],
          "filter": [
            {
              "range": {
                "ntime": {
                  "gte": "{}".format(s_time),
                  "lte": "{}".format(e_time)
                }
              }
            }
          ],
          "must_not": [
            {
              "match_phrase": {
                "adcode.keyword": ""
              }
            }
          ]
        }
      }
    }
    if args != '':
        simple_event_body['query']['bool']['must'].extend([{"match_phrase": {"{}.keyword".format(must_area): "{}".format(args)}}])
    return simple_event_body


def details_body_1(s_time: str, e_time: str, address: list):
    """
    详情表展示部分请求体
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param address: 地理位置信息
    :return: details es_body
    """
    addrs = {'province': address[0], 'city': address[1], 'district': address[2]}
    area, must_area, args = '', '', ''
    if address[0] == '':
        area, must_area, args = '', '', ''
    else:
        if address[0] != '':
            area, must_area, args = 'province', 'province', addrs.get('province')
        if address[1] != '':
            area, must_area, args = 'city', 'city', addrs.get('city')
        if address[2] != '':
            area, must_area, args = 'district', 'district', addrs.get('district')
    details_body = {
      "size": 10000,
      "sort": [
        {
          "ntime.keyword": {
            "order": "desc"
          }
        }
      ],
      "query": {
        "bool": {
          "must": [
            ],
          "filter": [
            {
              "range": {
                "ntime": {
                  "gte": "{}000000".format(s_time),
                  "lte": "{}999999".format(e_time)
                }
              }
            }
          ],
          "must_not": [
            {
              "match_phrase": {
                "adcode.keyword": ""
              }
            }
          ]
        }
      }
    }
    if area != '':
        details_body['query']['bool']['must'].extend([{"match_phrase": {"{}".format(area): "{}".format(args)}}])
    return details_body


def details_body_2(s_time: str, e_time: str, data: list):
    """
    详情表展示部分请求体
    :param s_time: 起始时间
    :param e_time: 结束时间
    :param data: 筛选条件
    :return: details es_body
    """
    details_body = {
        "query": {
            "bool": {
                "should": [
                    {
                        "match": {
                            "": "" # 省份还是地市,province name
                        }
                    },
                    {
                        "match": {
                            "sip.keyword": "" # 具体IP地址
                        }
                    }
                ],
                "must_not": [
                    {
                        "match_phrase": {
                            "payload.keyword": "NULL"
                        }
                    }
                ]
            }
        }
    }
    return details_body


def get_md5(s: str):
    """
    计算哈希值函数
    :param s: 传入字符串
    :return: 该字符串的哈希值
    """
    m = md5()
    m.update(s.encode(encoding='utf-8'))
    s_hash = m.hexdigest()
    return s_hash

