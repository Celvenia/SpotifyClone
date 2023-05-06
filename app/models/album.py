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
    # songs = db.relationship('Song', backref='album', lazy=True)
    genres = db.Column(db.String, nullable=True) #nullable set to True for testing
    record_label = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # likes = db.relationship('Like', primaryjoin='and_(Like.like_type=="album", foreign(Like.like_id)==Album.id)', back_populates='albums')
    # songs = db.relationship('Song', primaryjoin='and_(Song.genres==Album.genres, foreign(Song.album_id)==Album.id)', back_populates='albums')
    # artists = db.relationship('Artist', primaryjoin='and_(Artist.genres==Album.genres, foreign(Album.artist_ids)==Artist.id)')
    # artists = db.relationship('Artist', primaryjoin='and_(Artist.genres==Album.genres, foreign(Artist.id)==Album.artist_ids)')
    liked_by = db.relationship('User', secondary='likes', back_populates='liked_albums')
    songs = db.relationship('Song', primaryjoin='and_(Song.genres==Album.genres, foreign(Song.album_id)==Album.id)', back_populates='albums')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'cover_art': self.cover_art,
            'release_date': self.release_date,
            'genres': self.genres,
            'record_label': self.record_label,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    