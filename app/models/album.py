from .db import db, environment, SCHEMA
from flask_login import UserMixin
from sqlalchemy.sql import func

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    release_date = db.Column(db.Date)
    songs = db.relationship('Song', backref='album', lazy=True)
    likes = db.relationship('Like', backref='album', lazy=True)
    genres = db.relationship('Genre', back_ref='album_genre')
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    def to_album_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'artist_id': self.artist_id,
            'release_date': self.release_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    