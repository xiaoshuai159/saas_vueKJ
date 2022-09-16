# coding=utf-8
"""
jwt访问控制
"""
import jwt
from jwt import PyJWT, PyJWTError
from datetime import datetime, timedelta
from User import USERS
from warnings import filterwarnings

filterwarnings('ignore')

secert_key = 'AbstractJWKBase.'


def genToken(data):
    expInt = datetime.utcnow() + timedelta(seconds=3)
    payload = {
        'exp': expInt,
        'data': data
    }
    jwt_ = PyJWT()
    token_ = jwt_.encode(payload=payload, key=secert_key, algorithm='HS256')
    return token_


def verifyToken(token):
    try:
        tokenBytes = token.encode('utf-8')
        payload = jwt.decode(tokenBytes, key=secert_key, algorithms='HS256')
        return payload
    except PyJWTError as e:
        print("jwt验证失败: %s" % e)
        return None


# token = genToken(USERS[0])
# print(verifyToken(token))
