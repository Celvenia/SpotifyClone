from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from app.models import Follow, Song, db

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('', methods=['GET'])
@login_required
def follows():
    """

    """
    follows = Follow.query.filter(Follow.user_id==current_user.id).all()
    return {'follows': [follow.to_dict() for follow in follows]}


# @follow_routes.route('/<int:id>')
# @login_required
# def follow(id):
#     """
#     Query for a album by id and returns that album in a dictionary
#     """
#     follow = Follow.query.get(id)
#     return follow.to_dict()
