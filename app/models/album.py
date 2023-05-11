from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    cover_art = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=True)
    record_label = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    liked_by = db.relationship('User', secondary='likes', back_populates='liked_albums')
    songs = db.relationship('Song', primaryjoin='and_(Song.genre==Album.genre, foreign(Song.album_id)==Album.id)', back_populates='albums')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'cover_art': self.cover_art,
            'release_date': self.release_date,
            'genre': self.genre,
            'record_label': self.record_label,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
