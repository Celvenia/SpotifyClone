from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Song, Album
from ..models.db import db
from datetime import datetime


album_routes = Blueprint('albums', __name__)


@album_routes.route('')
@login_required
def albums():
    """
    Query for all albums and returns them in a list of user dictionaries
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}

@album_routes.route('/<int:id>')
@login_required
def album(id):
    """
    Query for a album by id and returns that album in a dictionary
    """
    album = Album.query.get(id)
    return album.to_dict()

# @album_routes.route('/current')
# @login_required
# def albums():
#     """
#     Query for all albums and returns them in a list of user dictionaries
#     """
#     user_albums = Album.query.filter(Album.user_id==current_user.id).all()
#     return {'albums': [album.to_dict() for album in user_albums]}
