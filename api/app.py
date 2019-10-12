from flask import Flask, Blueprint


app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/api')
app.register_blueprint(blueprint)


@app.route('/')
def get_description():
    pass
