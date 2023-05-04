from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Artist(db.Model):
    __tablename__ = 'artists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    bio = db.Column(db.String(255), nullable=False, unique=True)
    genre = db.Column(db.String(255), nullable=False)
    is_band = db.Column(db.Boolean, nullable=False)
    members = db.Column(db.Integer(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True))
    updated_at = db.Column(db.DateTime(timezone=True))

    albums = db.relationship('Album', primaryjoin='and_(Artist.genres==Album.genres, foreign(Artist.user_id)==Artist.artist_ids)', back_populates='artists')
    user = db.relationship('User', primaryjoin='foreign(Artist.user_id)==User.id')
