from .db import db, environment, SCHEMA

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, unique=True)
    song_ids = db.Column(db.String(255), nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False) # Text or Blob preferred
    is_private = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True))
    updated_at = db.Column(db.DateTime(timezone=True))

    user = db.relationship('User', primaryjoin='foreign(Playlist.user_id)==User.id')
    likes = db.relationship('Like', primaryjoin='and_(Like.like_type=="playlist", foreign(Like.like_id)==Playlist.id)', back_populates='playlist')
    song = db.relationship('Song', primaryjoin='foreign(Playlist.song_id)==Song.id')
