from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

# join table for many to many relationship between Playlist and Song models
playlist_songs = db.Table('playlist_songs',
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    is_private = db.Column(db.Boolean, default=False)
    tile_image_url = db.Column(db.String, nullable=True, default='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png')
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    songs = db.relationship('Song', secondary=playlist_songs, back_populates='playlists')
    # liked_by = db.relationship('User', secondary='likes', back_populates='liked_playlists')
    user = db.relationship('User', foreign_keys='Playlist.user_id')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            # 'description': self.description,
            'is_private': self.is_private,
            'tile_image_url': self.tile_image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'songs': [song.to_dict() for song in self.songs]
        }
