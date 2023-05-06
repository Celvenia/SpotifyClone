from flask import Blueprint, jsonify
from app.models import Album

album_routes = Blueprint('albums', __name__)


@album_routes.route('/')
def albums():
    """
    Query for all albums and returns them in a list of user dictionaries
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}

@album_routes.route('/<int:id>')
def album(id):
    """
    Query for a album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    return album.to_dict()