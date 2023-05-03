from .db import db, environment, SCHEMA

class UsersQueuedSong(db.Model):
    __tablename__ = 'users_queued_songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, nullable=False, unique=True)
    created_at = db.Column(db.DateTime(timezone=True))
    updated_at = db.Column(db.DateTime(timezone=True))