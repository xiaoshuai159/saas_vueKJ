# coding=utf-8
from flask import Blueprint


indexes = Blueprint('index', __name__, template_folder='./dist',
                    static_folder='./dist', static_url_path='./dist')