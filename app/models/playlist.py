from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    song_id = db.Column(db.Integer, nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False) # Text or Blob preferred
    is_private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    liked_by = db.relationship('User', secondary='likes', back_populates='liked_playlists')
    user = db.relationship('User', primaryjoin='foreign(Playlist.user_id)==User.id')
    song = db.relationship('Song', primaryjoin='foreign(Playlist.song_id)==Song.id')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'song_id': self.song_id,
            'title': self.title,
            'description': self.description,
            'is_private': self.is_private,
            'created_at': self.created_at,
            'updated_at': self.updated_at,

            # 'songs': {song.id: song.to_dict() for song in self.song}
        }
