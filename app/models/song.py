from .db import db, environment, SCHEMA
from sqlalchemy.sql import func
from .playlist import playlist_songs
from .queue import queued_songs

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    album_id = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.Integer, nullable=True)
    duration_ms = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String, nullable=False)
    release_date = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    queue = db.relationship('Queue', secondary=queued_songs, back_populates='songs')
    # liked_by = db.relationship('User', secondary='likes', back_populates='liked_songs')
    playlists = db.relationship('Playlist', secondary=playlist_songs, back_populates='songs')
    albums = db.relationship('Album', primaryjoin='and_(Song.genre==Album.genre, foreign(Song.album_id)==Album.id)')

    def to_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'album_id': self.album_id,
            'user_id': self.user_id,
            'duration_ms': self.duration_ms,
            'url': self.url,
            'release_date': self.release_date,
            'genre': self.genre,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
