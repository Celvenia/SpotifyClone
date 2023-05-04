from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Song

song_routes = Blueprint('songs', __name__)


@song_routes.route('/', methods=['GET'])
@login_required
def user_songs():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    user_songs = Song.query.filter(Song.user_id==current_user.id).all()
    return {'songs': [song.to_dict() for song in user_songs]}

# @song_routes.route('/<int:id>')
# def song(id):
#     """
#     Query for a song by id and returns that song in a dictionary
#     """
#     song = song.query.get(id)
#     return song.to_dict()