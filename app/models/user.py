from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .user_pin import user_pins
from .follow import follows
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

    following = db.relationship(
        # this is our left side table and we named it following
        # the right side table is the *follows*
        'User',
        secondary=follows,
        # secondary configures the association table that is used for this relationship
        primaryjoin=(follows.c.user_id == id),
        # primaryjoin indicates the condition that links the left side entity
        secondaryjoin=(follows.c.following_id == id),
        # secondaryjoin indicates the condition that links the right side entity (the followed user) with the association table
        backref='follows',
        # backref: defines how this relationship will be accessed from the right side entity (follows)
        lazy='dynamic'
        # A dynamic mode to sets up the query to not run until specifically requested
    )
    
    # followers = db.relationship(
    #     'User',
    #     secondary=follows,
    #     primaryjoin=(follows.c.following_id == id),
    #     secondaryjoin=(follows.c.user_id == id),
    #     backref='following',
    #     lazy='dynamic'
    # )
    
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
