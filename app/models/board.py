from .db import db, environment, SCHEMA, add_prefix_for_prod
from .board_pins import board_pins

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    board_cover = db.Column(db.String(255))
    secret = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="boards")

    pins = db.relationship(
        'Pin',
        secondary=board_pins,
        back_populates='boards'
    )
