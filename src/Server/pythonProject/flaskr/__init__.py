import os

from flask import Flask
from flask import request


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    from . import db
    db.init_app(app)

    def query_db(query, args=(), one=False):
        cur = db.get_db().execute(query, args)
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/login', methods=['GET', 'POST', 'PUT', 'DELETE'])
    def get_profile():
        if request.method == 'GET':
            name = request.args.get('name', None)
            payload = []
            if name is None:
                for user in query_db('select * from post'):
                    contents = {'id': user['id'], 'uid': user['author_id'], 'created': user['created'],
                                'title': user['title'], 'body': user['body']}
                    payload.append(contents)
                return payload
            else:
                user = query_db('select * from post where title = ?',
                                [name], one=True)
                if user is None:
                    print('No such user')
                    return 'No such user'
                else:
                    contents = {'id': user['id'], 'uid': user['author_id'], 'created': user['created'],
                                'title': user['title'], 'body': user['body']}
                    payload.append(contents)
                return payload
        else:
            print(request.form)
            print(request.json)
            name = request.args.get('name', '')
            if name == "JackChen":
                return "1349 from get"
            return dict(name='JackChen from get', data='1349')

    return app

