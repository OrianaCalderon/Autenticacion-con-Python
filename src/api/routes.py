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


def code_password(password,salt):
    return generate_password_hash(f"{password}{salt}")

def verify_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


@api.route("/login", methods=['POST'])
def user_login():
    if request.method == 'POST':
        body = request.json
        email = body.get('email')
        password = body.get('password')

        if email is None:
            return jsonify({"Bad request,"}), 400
        elif password is None:
            return jsonify({"Bad request,"}), 400
        else:
            user_login = User.query.filter_by(email=email).one_or_none()
            if user_login is None:
                 return jsonify({"Bad request,"}), 400
            else:
                if verify_password(hash_password=user_login.password, password=password, salt=user_login.salt):
                    create_token = create_access_token(identity=user_login.id)
                    return jsonify({"access token:":create_token})
                else:
                    return jsonify({"Bad request,"}), 400
    return jsonify({"Accepted"}), 202



@api.route("/signup", methods=['POST'])
def new_user():
    if request.method == 'POST':
        body = request.json
        email = body.get('email')
        password = body.get('password')
        if email is None:
            return jsonify({"Bad request,"}), 400
        elif password is None:
            return jsonify({"Bad request,"}), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            new_password = code_password(password=password, salt=salt)
            add_new_user = User(email=email, password=new_password, salt=salt)
            db.session.add(add_new_user)
            try:
                db.session.commit()
                return jsonify(add_new_user.serialize()),201
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({f"Error: {error.args}"}), 500



@api.route("/private", methods=['GET'])
@jwt_required()
def private_users():
    if request.method == 'GET':
        users = User.query.all()
        user_id = User.query.get(get_jwt_identity())
        print(user_id.serialize())
        return jsonify(list(map(lambda user: user.serialize(), users)))