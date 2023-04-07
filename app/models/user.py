from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_pin import user_pins

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255))
    about = db.Column(db.String(255))

     # relationship attributed
    pins = db.relationship(
        'Pin',
        back_populates='user'
    )

    boards = db.relationship(
        'Board',
        back_populates='user'
    )

    saved_pins = db.relationship(
        'Pin',
        secondary=user_pins,
        back_populates='user_saved'
    )

    user_following = db.relationship(
        'Follow',
        back_populates='user_follower'
    )

    user_follower = db.relationship(
        'Follow',
        back_populates = 'user_following'
    )

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
            'email': self.email
        }
