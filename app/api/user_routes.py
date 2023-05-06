from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/likes')
@login_required
def user_likes(id):
    """
    Query for a user by id and returns a list of dictionaries containing
    each like the user has made, including the song, album, or playlist
    """
    user = User.query.get(id)
    likes = [like.to_dict() for like in user.likes]
    return {'likes': likes}


@user_routes.route('/<int:id>/liked_playlists')
@login_required
def user_liked_playlists(id):
    """
    Query for a user by id and returns a list of playlists
    the user has liked
    """
    user = User.query.get(id)
    liked_playlists = [playlist.to_dict() for playlist in user.liked_playlists]
    return {'liked_playlists': liked_playlists}


@user_routes.route('/<int:id>/liked_songs')
@login_required
def user_liked_songs(id):
    """
    Query for a user by id and returns a list of songs
    the user has liked
    """
    user = User.query.get(id)
    liked_songs = [playlist.to_dict() for playlist in user.liked_songs]
    return {'liked_songs': liked_songs}


@user_routes.route('/<int:id>/liked_albums')
@login_required
def user_liked_albums(id):
    """
    Query for a user by id and returns a list of albums
    the user has liked
    """
    user = User.query.get(id)
    liked_albums = [playlist.to_dict() for playlist in user.liked_albums]
    return {'liked_albums': liked_albums}