from .db import db, environment, SCHEMA, add_prefix_for_prod

class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True),
    user_id = db.Column(db.Integer, db.ForeignKey("users.id")),
    name = db.Column(db.String(50), nullable=False),
    description = db.Column(db.String(255)),
    board_cover = db.Column(db.String(255)),
    secret = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="boards")

    board_pins = db.relationship(
        'Pin',
        secondary=board_pins,
        back_populates='pin_board'
    )
