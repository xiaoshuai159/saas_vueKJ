# coding=utf-8
"""
详情信息数据获取函数
"""
import codecs
import time
import json

from utils.funcs import details_body_1, get_md5


fp = codecs.open(r'./test/test.csv', encoding='gbk')
test_data = []
for line in fp:
    info = line.strip().split(',')
    # get_md5(''.join(info[::]))
    test_data.append({"_id": '191.168.689.789', "date": info[0], "time": info[1], "event_type": info[2],
                      "city": info[3], "district": info[4], "unit_type": info[5], "unit_name": info[6]})
fp.close()


def get_details():
    data = []
    return test_data


# print(test_data)
