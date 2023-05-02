from .db import db, environment, SCHEMA

class Liked(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, nullable=False, unique=True)
    liked_id = db.Column(db.Integer, nullable=False, unique=True)
    liked_type = db.Column(db.String, nullable=False) #ENUM type?