from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from app.models import Playlist, Song, Album, db

playlist_routes = Blueprint('playlists', __name__)


@playlist_routes.route('', methods=['GET'])
@login_required
def user_playlists():
    """
    Query for all playlists and returns them in a list of user dictionaries
    """
    user_playlists = Playlist.query.filter(Playlist.user_id==current_user.id).all()
    return {'playlists': [playlist.to_dict() for playlist in user_playlists]}


@playlist_routes.route('/<int:id>')
@login_required
def playlists(id):
    """
    Query for a playlist by id and returns that playlist in a dictionary
    """
    playlist = Playlist.query.get(id)
    return playlist.to_dict()



# Route for creating a new playlist
@playlist_routes.route('/', methods=['POST'])
@login_required
def create_playlist():
    data = request.get_json()

    # Ensure all required fields are present in the request
    if 'title' not in data:
        return jsonify({'error': 'Missing required field: title'}), 400
    if 'is_private' not in data:
        return jsonify({'error': 'Missing required field: is_private'}), 400

    # Create a new playlist object and add it to the database
    playlist = Playlist(title=data['title'], description=data.get('description'), is_private=data.get('is_private'), user_id=current_user.id)
    db.session.add(playlist)
    db.session.commit()

    return jsonify({'playlist': playlist.to_dict()}), 201


# Route for updating an existing playlist
@playlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_playlist(id):
    data = request.get_json()

    # Fetch the existing playlist by ID
    playlist = Playlist.query.get(id)

    # Ensure the playlist exists and belongs to the current user
    if playlist is None:
        return jsonify({'error': 'Playlist not found'}), 404
    if playlist.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    # Update the playlist with the new data and commit to the database
    playlist.title = data.get('title', playlist.title)
    playlist.description = data.get('description', playlist.description)
    playlist.is_private = data.get('is_private', playlist.is_private)
    db.session.commit()

    return jsonify({'playlist': playlist.to_dict()})


# Route for deleting an existing playlist
@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist(id):
    # Fetch the existing playlist by ID
    playlist = Playlist.query.get(id)

    # Ensure the playlist exists and belongs to the current user
    if playlist is None:
        return jsonify({'error': 'Playlist not found'}), 404
    if playlist.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    # Delete the playlist from the database and commit the transaction
    db.session.delete(playlist)
    db.session.commit()

    return jsonify({'message': 'Playlist deleted successfully'})

# add song to playlist
@playlist_routes.route('/<int:playlist_id>/songs', methods=['POST'])
@login_required
def add_song_to_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return {'errors': ['Playlist not found']}, 404

    song_id = request.json.get('song_id')
    if not song_id:
        return {'errors': ['Song id is required']}, 400

    song = Song.query.get(song_id)
    if not song:
        return {'errors': ['Song not found']}, 404

    # append the song to the playlist
    playlist.songs.append(song)
    db.session.commit()

    return playlist.to_dict(), 200

# add every song in album to playlist
@playlist_routes.route('/<int:playlist_id>/albums', methods=['POST'])
@login_required
def add_album_to_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return {'errors': ['Playlist not found']}, 404

    album_id = request.json.get('album_id')
    if not album_id:
        return {'errors': ['Album id is required']}, 400

    songs = Song.query.filter_by(album_id=album_id).all()
    if not songs:
        return {'errors': ['No songs found for the specified album']}, 404

    # append each song to the playlist
    for song in songs:
        playlist.songs.append(song)

    db.session.commit()

    return playlist.to_dict(), 200

