from flask import Flask
from flask import request
from gevent import pywsgi
from search.search_engine import SearchService
import mysql.connector

app = Flask(__name__)
search_service = SearchService()


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/name")
def get_name():
    return "JackChen"


@app.route("/data")
def get_data():
    return "1349"


@app.route('/Search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        key = request.json.get('Key')
        return dict(name='JackChen from post', data='1349')
    else:
        # search_service.is_database_connected()
        name = request.args.get('name', '')
        s = None
        try:
            s = search_service.get_data_by_keyword(name, 20, 1)
        except mysql.connector.Error as e:
            print(f"数据库连接断开。错误：{e}")
            print("尝试重新连接...")
            search_service.reconnect()
        if s is None:
            return "None"
        return s


if __name__ == '__main__':
    server = pywsgi.WSGIServer(('127.0.0.1', 8080), app)
    server.serve_forever()
