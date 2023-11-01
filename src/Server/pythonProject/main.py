from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/name")
def get_name():
    return "JackChen"


@app.route("/data")
def get_data():
    return "1349"


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(request.form)
        print(request.json)
        name = request.json.get('name')
        if name == "jackChen":
            return "1349 from post"
        return dict(name='JackChen from post', data='1349')
    else:
        print(request.form)
        print(request.json)
        name = request.args.get('name', '')
        if name == "JackChen":
            return "1349 from get"
        return dict(name='JackChen from get', data='1349')
