from .db import db, environment, SCHEMA

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artist_ids = db.Column(db.Integer, nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=False)
    cover_art = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    genres = db.Column(db.String, nullable=False)
    record_label = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True))
    updated_at = db.Column(db.DateTime(timezone=True))

    likes = db.relationship('Like', primaryjoin='and_(Like.like_type=="album", foreign(Like.like_id)==Album.id)', back_populates='albums')
    songs = db.relationship('Song', primaryjoin='and_(Song.genres==Album.genres, foreign(Song.album_id)==Album.id)', back_populates='albums')
    artists = db.relationship('Artist', primaryjoin='and_(Artist.genres==Album.genres, foreign(Album.artist_ids)==Artist.id)')
    # artists = db.relationship('Artist', primaryjoin='and_(Artist.genres==Album.genres, foreign(Artist.id)==Album.artist_ids)')
