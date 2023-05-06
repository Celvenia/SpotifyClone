from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

# join table for many to many relationship between Queue and Song models
queued_songs = db.Table('queued_songs',
    db.Column('queued_id', db.Integer, db.ForeignKey('queued.id'), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
)

class Queue(db.Model):
    __tablename__ = 'queued'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    songs = db.relationship('Song', secondary=queued_songs, back_populates='queue')
    user = db.relationship('User', foreign_keys='Queue.user_id')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'songs': [song.to_dict() for song in self.songs],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    