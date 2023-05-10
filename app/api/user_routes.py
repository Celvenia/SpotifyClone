from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Album, Song, Playlist
from ..models.db import db

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
    each like(instance) the user has made, including the song, album, or playlist
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
    liked_songs = [song.to_dict() for song in user.liked_songs]
    return {'liked_songs': liked_songs}


@user_routes.route('/<int:user_id>/liked_albums')
@login_required
def user_liked_albums(user_id):
    """
    Query for a user by id and returns a list of albums
    the user has liked
    """
    user = User.query.get(id)
    liked_albums = [album.to_dict() for album in user.liked_albums]
    return {'liked_albums': liked_albums}

@user_routes.route('/users/<int:user_id>/liked_albums/<int:album_id>', methods=['DELETE'])
def remove_liked_album(user_id, album_id):
    user = User.query.get(user_id)
    album = Album.query.get(album_id)
    
    # if user and album exist, remove the album in user's liked_albums 
    if user and album and album in user.liked_albums:
        user.liked_albums.remove(album)
        db.session.commit()
        return jsonify(message=f"Album with id {album_id} has been unliked")
    
    return jsonify(message=f"Could not delete liked album with id {album_id} for user with id {user_id}")

@user_routes.route('/users/<int:user_id>/liked_songs/<int:song_id>', methods=['DELETE'])
def remove_liked_song(user_id, song_id):
    user = User.query.get(user_id)
    song = Song.query.get(song_id)
    
    # if user and song exist, remove the song from user's liked_songs 
    if user and song and song in user.liked_songs:
        user.liked_songs.remove(song)
        db.session.commit()
        return jsonify(message=f"Song with id {song_id} has been unliked")
    
    return jsonify(message=f"Could not delete liked song with id {song_id} for user with id {user_id}")

@user_routes.route('/users/<int:user_id>/liked_playlists/<int:playlist_id>', methods=['DELETE'])
def remove_liked_playlist(user_id, playlist_id):
    user = User.query.get(user_id)
    playlist = Playlist.query.get(playlist_id)
    
    # if user and playlist exist, remove the playlist from user's liked_playlists 
    if user and playlist and playlist in user.liked_playlists:
        user.liked_playlists.remove(playlist)
        db.session.commit()
        return jsonify(message=f"Playlist with id {playlist_id} has been unliked")
    
    return jsonify(message=f"Could not delete liked playlist with id {playlist_id} for user with id {user_id}")

@user_routes.route('/users/<int:user_id>/liked_albums/<int:album_id>', methods=['POST'])
def add_liked_album(user_id, album_id):
    user = User.query.get(user_id)
    album = Album.query.get(album_id)

    # if user and album exist, add the album to user's liked_albums 
    if user and album:
        user.liked_albums.append(album)
        db.session.commit()
        return jsonify(message=f"Album with id {album_id} has been liked by user with id {user_id}")
    
    return jsonify(message=f"Could not like album with id {album_id} for user with id {user_id}")

@user_routes.route('/users/<int:user_id>/liked_songs/<int:song_id>', methods=['POST'])
def add_liked_song(user_id, song_id):
    user = User.query.get(user_id)
    song = Song.query.get(song_id)

    # if user and song exist, add the song to user's liked_songs
    if user and song:
        user.liked_songs.append(song)
        db.session.commit()
        return jsonify(message=f"Song with id {song_id} has been liked by user with id {user_id}")

    return jsonify(message=f"Could not like song with id {song_id} for user with id {user_id}")

@user_routes.route('/users/<int:user_id>/liked_playlists/<int:playlist_id>', methods=['POST'])
def add_liked_playlist(user_id, playlist_id):
    user = User.query.get(user_id)
    playlist = Playlist.query.get(playlist_id)

    # if user and playlist exist, add the playlist to user's liked_playlists
    if user and playlist:
        user.liked_playlists.append(playlist)
        db.session.commit()
        return jsonify(message=f"Playlist with id {playlist_id} has been liked by user with id {user_id}")

    return jsonify(message=f"Could not like playlist with id {playlist_id} for user with id {user_id}")
