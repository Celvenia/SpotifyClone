from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Song, Album
from ..models.db import db
from datetime import datetime

song_routes = Blueprint('songs', __name__)


@song_routes.route('', methods=['GET'])
@login_required
def user_songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    # user_songs = Song.query.filter(Song.user_id==current_user.id).all()
    user_songs = Song.query.all()
    return {'songs': [song.to_dict() for song in user_songs]}

@song_routes.route('/<int:id>')
@login_required
def song(id):
    """
    Query for a song by id and returns that song in a dictionary
    """
    song = Song.query.get(id)
    return song.to_dict()

@song_routes.route('', methods=['POST'])
@login_required
def create_song():
    """
    Creates a new song with the given parameters if the user is an artist
    """
    if not current_user.is_artist:
        return jsonify(error="You don't have the permission to create a song"), 401

    album_id = request.json.get('album_id')
    title = request.json.get('title')
    duration_ms = request.json.get('duration_ms')
    url = request.json.get('url')
    user_id = current_user.id   
    release_date = request.json.get('release_date')
    genre = request.json.get('genre')

    new_song = Song(
        title=title,
        album_id=album_id,
        user_id=user_id,
        duration_ms=duration_ms,
        url=url,
        release_date=release_date,
        genre=genre
    )

    db.session.add(new_song)
    db.session.commit()

    return new_song.to_dict(), 201


@song_routes.route('/<int:songId>', methods=['PUT'])
@login_required
def update_song(songId):
    """
    Updates an existing song with the given id if the user is the song's artist
    """
    song = Song.query.get(songId)

    if song.user_id != current_user.id:
        return jsonify(error=["You don't have the permission to update this song"]), 401

    title = request.json.get('title')
    album_id = request.json.get('album_id')
    duration_ms = request.json.get('duration_ms')
    url = request.json.get('url')
    release_date = request.json.get('release_date')
    genre = request.json.get('genre')
    

    song.title = title or song.title
    song.album_id = album_id or song.album_id
    song.duration_ms = duration_ms or song.duration_ms
    song.url = url or song.url
    song.release_date = release_date or song.release_date
    song.genre = genre or song.genre
    song.updated_at = datetime.now()

    db.session.commit()

    return song.to_dict()


@song_routes.route('/<int:songId>', methods=['DELETE'])
@login_required
def delete_song(songId):
    """
    Deletes an existing song with the given id if the user is the song's artist
    """
    song = Song.query.get(songId)

    if song.user_id != current_user.id:
        return jsonify(error=["You don't have the permission to delete this song"]), 401

    db.session.delete(song)
    db.session.commit()

    return {"song": song.to_dict()}
