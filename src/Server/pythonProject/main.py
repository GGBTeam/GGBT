from flask import Flask
from flask import request
from gevent import pywsgi
from search.search_engine import SearchService

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
        name = request.args.get('name', '')
        s = search_service.get_data_by_keyword(str(name), 20, 1)
        # return dict(name='JackChen from get', data='1349')
        if s is None:
            return "None"
        return s


if __name__ == '__main__':
    server = pywsgi.WSGIServer(('127.0.0.1', 8080), app)
    server.serve_forever()

