from .db import db, environment, SCHEMA
from sqlalchemy.sql import func


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follow_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship('User', foreign_keys='Follow.user_id')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'follow_id': self.follow_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
