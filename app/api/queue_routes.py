from flask import Blueprint, jsonify, request, current_app
from flask_login import login_required, current_user
from app.models import Queue, Song, db

queue_routes = Blueprint('queue', __name__)


@queue_routes.route('/', methods=['GET'])
@login_required
def users_queue():
    """
    Query for queue and returns them in a list of user dictionaries
    """
    users_queue = Queue.query.filter(Queue.user_id==current_user.id).all()
    return {'queue': [queue.to_dict() for queue in users_queue]}

# add song to queue
@queue_routes.route('/<int:queue_id>/songs', methods=['POST'])
@login_required
def add_song_to_queue(queue_id):
    queue = Queue.query.get(queue_id)
    if not queue:
        return {'errors': ['Queue not found']}, 404

    song_id = request.json.get('song_id')
    if not song_id:
        return {'errors': ['Song id is required']}, 400

    song = Song.query.get(song_id)
    if not song:
        return {'errors': ['Song not found']}, 404

    # append the song to the queue
    queue.songs.append(song)
    db.session.commit()

    return queue.to_dict(), 200

# delete song from queue
@queue_routes.route('/<int:queue_id>/songs/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song_from_queue(queue_id, song_id):
    queue = Queue.query.get(queue_id)
    if not queue:
        return {'errors': ['Queue not found']}, 404

    song = Song.query.get(song_id)
    if not song:
        return {'errors': ['Song not found']}, 404

    # append the song to the queue
    queue.songs.remove(song)
    db.session.commit()

    return queue.to_dict(), 200
