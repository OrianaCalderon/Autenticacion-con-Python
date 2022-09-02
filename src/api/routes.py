"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")
    

@api.route('/user', methods=['POST'])
@jwt_required()
def add_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)
        
        if email is None or password is None:
            print("falta algo")
            return jsonify('debe enviar el payload completo'), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            request_user = User(email=email, password=password, salt=salt)
            db.session.add(request_user)
           
            try:
                db.session.commit()
                return jsonify('todo bien :)'), 201
            except Exception as error:
                db.session.rollback()
                print(error.args)
                return jsonify('algo salio mao, sorry manito'), 500
            
        #email pass salt
    return jsonify(),201



@api.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        body = request.json
        email = body.get('email', None)
        password = body.get('password', None)
        
        login_user = User.query.filter_by(email=email).one_or_none()
       
        if login_user:
            if check_password(login_user.password, password, login_user.salt):
                #creamos el token
                bubulala = create_access_token(identity=login_user.id)
                return jsonify({'token':bubulala})
            else:
                return jsonify('Bad credentials'), 400
        else:
            return jsonify('Bad credentials'), 400
    return jsonify('todo bien'), 201


@api.route('/user', methods=['GET'])
@jwt_required()
def all_user():
    all_user = User.query.all()
    user_id = User.query.get(get_jwt_identity())
    print(user_id.serialize())

    return jsonify(list(map(lambda user: user.serialize(), all_user)))