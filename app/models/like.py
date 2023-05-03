from .db import db, environment, SCHEMA

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, nullable=False, unique=True)
    like_id = db.Column(db.Integer, nullable=False, unique=True)
    like_type = db.Column(db.Enum("album", "playlist", "song"), nullable=False) #ENUM type?
    created_at = db.Column(db.DateTime(timezone=True))
    updated_at = db.Column(db.DateTime(timezone=True))
    albums = db.relationship('Album', primaryjoin='and_(Like.like_type=="album", foreign(Like.like_id)==Album.id)')