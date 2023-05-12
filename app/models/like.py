from .db import db, environment, SCHEMA
from sqlalchemy.sql import func


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    like_type = db.Column(db.Enum('song', 'playlist', 'album', name='like_type'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    liked_song = db.relationship('Song', backref='liked_songs', lazy=True)
    liked_album = db.relationship('Album', backref='liked_albums', lazy=True)
    liked_playlist = db.relationship('Playlist', backref='liked_playlists', lazy=True)



    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'like_type': self.like_type,
            'song_id': self.song_id,
            'album_id': self.album_id,
            'playlist_id': self.playlist_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    