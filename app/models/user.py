from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_artist = db.Column(db.Boolean, default=False)
    profile_picture = db.Column(db.String(255), nullable=True, default="https://res.cloudinary.com/dtzv3fsas/image/upload/v1684125923/SpotifyClone/black-outline-avatar-silhouette-default-260nw-610982348_ifydtq.jpg")
    public_name = db.Column(db.String(255), nullable=False)
    banner_image = db.Column(db.String(255), nullable=True, default="https://res.cloudinary.com/dtzv3fsas/image/upload/v1684125870/SpotifyClone/grey-background_lyqdqc.jpg")
    # likes = db.relationship('Like', backref='user', lazy=True)
    # liked_playlists = db.relationship('Playlist', secondary='likes', back_populates='liked_by')
    # liked_songs = db.relationship('Song', secondary='likes', back_populates='liked_by')
    # liked_albums = db.relationship('Album', secondary='likes', back_populates='liked_by')
    # queue = db.relationship('Queue', backref='users_queue', lazy=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    playlist = db.relationship('Playlist', primaryjoin='foreign(Playlist.user_id)==User.id', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_artist': self.is_artist,
            'profile_picture': self.profile_picture,
            'public_name': self.public_name,
            'banner_image': self.banner_image,
        }
