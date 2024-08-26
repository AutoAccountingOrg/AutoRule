from urllib.parse import quote

import requests
import markdown
import json
import time
import os
import re


"""
提取字符串中的第一个整数
"""
def extract_int(s):
    # 使用正则表达式匹配字符串中的第一个连续数字序列
    match = re.search(r'\d+', s.replace(".", ""))
    if match:
        # 如果找到数字，将其转换为整数
        return int(match.group())
    else:
        # 如果没有找到数字，返回 None 或抛出异常
        return 0

"""
使用alist的API上传文件
"""
def upload(filename, filename_new):
    # 上传文件
    url2 =   "https://cloud.ankio.net/api/fs/put"
    #
    filename_new = quote('/自动记账/自动记账/规则/' + filename_new, 'utf-8')  # 对文件名进行URL编码
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/58.0.3029.110 Safari/537.3',
        'Authorization': os.getenv("ALIST_TOKEN"),
        'file-path': filename_new
    }
    # 读取文件内容
    with open(filename, 'rb') as file:
        file_data = file.read()
    res = requests.put(url=url2, data=file_data, headers=headers)
    print(res.text)

"""
将数据写入文件
"""
def put_file():
    # 写入版本文件
    name = os.getenv("TAG_VERSION_NAME")
    t = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    log = os.getenv('CHANGELOG')
    html = markdown.markdown(log)
    markdown_log = "# 更新日志\n - 时间："+t+"\n - 版本："+name+"\n" + log
    # 版本文件
    data = {
        "version": name,
        "code": extract_int(name),
        "log": html,
        "date": t
    }
    json_str = json.dumps(data, indent=4)
    with open(os.getenv("GITHUB_WORKSPACE") + "/dist/index.json", 'w') as file:
        file.writelines(json_str)
    # 日志README
    with open(os.getenv("GITHUB_WORKSPACE") + "/dist/README.md", 'w') as file:
        file.writelines(markdown_log)
    return name, t, markdown_log

"""
上传到网盘
"""
def upload_pan():
    # 获取GITHUB_WORKSPACE环境变量并拼接dist目录
    dir = os.getenv("GITHUB_WORKSPACE") + "/dist"

    # 获取目录长度，后面用于生成相对路径
    dir_len = len(dir)

    # 遍历目录和子目录
    for root, dirs, files in os.walk(dir):
        for file in files:
            filename = os.path.join(root, file)

            # 生成相对路径
            filename_new = filename[dir_len:]

            # 上传文件
            upload(filename, filename_new)


"""
调用机器人发送消息
"""
def send_bot():
    pass

"""
在社区发帖
"""
def send_forums(api_key,title,content):
    url = "https://forum.ez-book.org/posts.json"
    headers = {
        "Content-Type": "application/json",
        "Api-Key": api_key,
        "Api-Username": "system"
    }
    data = {
        "title": title,
        "raw": content,
        "category": 9,
        "tags": ["版本发布","正式版"]
    }
    response = requests.post(url, headers=headers, json=data)
    print(response.json())

"""
通知用户
"""
def send_notify(title,content):
    # 在社区发帖
    send_forums(os.getenv("FORUMS_API_KEY"),title,content)
    # 在群里通知
    send_bot()


if __name__ == '__main__':
    name, t, markdown_log = put_file()
    upload_pan()
    send_notify(name,markdown_log)