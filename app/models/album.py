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