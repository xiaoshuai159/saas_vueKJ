# coding=utf-8
import random
from PIL import Image, ImageFont, ImageDraw, ImageFilter


def get_random_color():
    """
    四位验证码的颜色控制
    :return:
    """
    return random.randint(0, 255), random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)


def drawLines(draw, num, width, height):
    """
    划线
    """
    for num in range(num):
        x1 = random.randint(0, width / 2)
        y1 = random.randint(0, height / 2)
        x2 = random.randint(0, width)
        y2 = random.randint(height / 2, height)
        draw.line(((x1, y1), (x2, y2)), fill='black', width=1)


def generate_image(length):
    s = 'qwerQWERTYUIOtyuiopas123456dfghjklPASDFGHJKLZXCVBNMxcvbnm7890'
    # 指定图片的大小
    size = (130, 50)
    # 创建一个画布 , 需要三个参数, def new(mode, size, color=0):
    # model:使用的模式, size:图片大小, color:图片颜色
    im = Image.new('RGB', size, color='white')
    # 创建字体
    font = ImageFont.truetype('simkai.ttf', size=35)
    # 创建ImageDraw对象
    draw = ImageDraw.Draw(im)
    # 绘制验证码
    # 接收验证码
    code = ''
    for i in range(length):
        # 从字符串s中随机取出一个字符
        c = random.choice(s)
        code += c
        # 绘制
        # draw.text((x坐标,y坐标), text=绘制什么, file=字体颜色, font=字体)
        draw.text((5 + random.randint(4, 7) + 25 * i, 1),
                  text=c,
                  fill=get_random_color(),
                  font=font)
        # drawLines(draw, 2, 130, 50)
    return im, code

