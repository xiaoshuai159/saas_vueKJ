# codeing=utf-8
"""
User
"""
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash


# 测试用户样例
USERS = [
    {
        "id": 1,
        "login_user": "admin",
        "login_passwd": generate_password_hash("admin123"),
        "user_level": 1,
        "country": "",
        "province": "",
        "city": "",
        "district": "",
        "adcode": ""
    },
    {
        "id": 2,
        "login_user": "liaoning",
        "login_passwd": generate_password_hash("liaoning123"),
        "user_level": 2,
        "country": "",
        "province": "辽宁省",
        "city": "",
        "district": "",
        "adcode": "210000"
    },
{
        "id": 3,
        "login_user": "admin2",
        "login_passwd": generate_password_hash("admin123"),
        "user_level": 5,
        "country": "",
        "province": "",
        "city": "",
        "district": "",
        "adcode": ""
    },
]


class User(UserMixin):

    def __init__(self, user):
        self.id = user.get("id")
        self.user_name = user.get("login_user")
        self.password_hash = user.get("login_passwd")
        self.user_level = user.get("user_level")
        self.country = user.get("country")
        self.province = user.get("province ")
        self.city = user.get("city")
        self.district = user.get("district ")
        self.adcode = user.get("adcode")

    @staticmethod
    def queryUser(username):
        """
        根据传入的用户名，填补当前的User类属性信息
        :param username:
        :return: Class User
        """
        for user in USERS:
            if user.get('login_user') == username:
                return User(user)
        return None

    def verifyPasswd(self, passwd):
        """
        密码验证函数，传入密码会与当前存储的密码的hash进行哈希验证
        :param passwd: 密码
        :return: Bool是否正确
        """
        if self.password_hash is None:
            return False
        return check_password_hash(self.password_hash, passwd)

    def get_id(self):
        """
        获取用户id
        :return: self.id
        """
        return self.id

    def get(self, user_id):
        """
        根据用户id 获取所有信息
        :param user_id:
        :return:
        """
        for user in USERS:
            if str(user.get("id")) == str(user_id):
                return user
        return None
