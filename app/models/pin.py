from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_pin import user_pins
from .board_pins import board_pins


class Pin(db.Model):
    __tablename__ = "pins"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    # board_id = db.Column(
    #     db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), nullable=False
    # )
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    category = db.Column(db.String(100))

    url = db.Column(db.String(255))

    # relationship attributed
    user = db.relationship("User", back_populates="pins")

    boards = db.relationship(
        # secondary = join table name
        # back_populates = column name of the other table
        "Board",
        secondary=board_pins,
        back_populates="pins",
    )

    user_saved = db.relationship(
        "User", secondary=user_pins, back_populates="saved_pins"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "url": self.url,
        }
