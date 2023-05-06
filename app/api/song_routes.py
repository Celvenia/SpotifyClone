from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Song, Album
from ..models.db import db

song_routes = Blueprint('songs', __name__)


@song_routes.route('/', methods=['GET'])
@login_required
def user_songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    user_songs = Song.query.filter(Song.user_id==current_user.id).all()
    return {'songs': [song.to_dict() for song in user_songs]}

@song_routes.route('/<int:id>')
def song(id):
    """
    Query for a song by id and returns that song in a dictionary
    """
    song = Song.query.get(id)
    return song.to_dict()

@song_routes.route('/<int:id>', methods=['PUT'])
def update_song(id):
    """
    Update a song by id
    """
    song = Song.query.get(id)
    if song is None:
        return jsonify(error='Song not found'), 404

    data = request.get_json()
    if data is None:
        return jsonify(error='Invalid request body'), 400

    if 'title' in data:
        song.title = data['title']
    if 'artist' in data:
        song.artist = data['artist']
    if 'album_id' in data:
        album = Album.query.get(data['album_id'])
        if album is None:
            return jsonify(error='Album not found'), 400
        song.album = album

    db.session.commit()

    return song.to_dict()

@song_routes.route('/<int:id>', methods=['DELETE'])
def delete_song(id):
    """
    Delete a song by id
    """
    song = Song.query.get(id)
    if song is None:
        return jsonify(error='Song not found'), 404

    db.session.delete(song)
    db.session.commit()

    return jsonify(success=True)