from .db import db, environment, SCHEMA, add_prefix_for_prod




class Pin(db.Model):
    __tablename__ = 'pins'

    id = db.Column(db.Integer, primary_key=True),
    user_id = db.Column(db.Integer, db.ForeignKey("users.id")),
    board_id = db.Column(db.Integer, db.ForeignKey("boards.id")),
    name = db.Column(db.String(50), nullable=False),
    description = db.Column(db.String(255)),
    category = db.Column(db.String(50)),
    url = db.Column(db.String(255))

    # relationship attributed
    user = db.relationship(
        'User',
        back_populates='pins'
    )

    pin_board = db.relationship(
        'Board',
        secondary=board_pins,
        back_populates='board_pins'
    )

    user_saved = db.relationship(
        'User',
        secondary=user_pins,
        back_populates='saved_pins'
    )

    