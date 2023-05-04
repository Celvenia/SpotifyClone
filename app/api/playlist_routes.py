from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Playlist

playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('/', methods=['GET'])
@login_required
def user_playlists():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    user_playlists = Playlist.query.filter(Playlist.user_id==current_user.id).all()
    return {'playlists': [playlist.to_dict() for playlist in user_playlists]}


# @playlist_routes.route('/<int:id>')
# @login_required
# def playlists(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
