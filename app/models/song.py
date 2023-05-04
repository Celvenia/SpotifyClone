from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

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
    genres = db.Column(db.String, nullable=True) #nullable set to True for testing
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    playlist = db.relationship('Playlist', primaryjoin='foreign(Playlist.song_id)==Song.id', back_populates='song')
    albums = db.relationship('Album', primaryjoin='and_(Song.genres==Album.genres, foreign(Song.album_id)==Album.id)')

    def to_song_dict(self):
        return{
            'id': self.id,
            'title': self.title,
            'album_id': self.album_id,
            'user_id': self.user_id,
            'duration_ms': self.duration_ms,
            'url': self.url,
            'release_date': self.release_date,
            'genres': self.genres,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }