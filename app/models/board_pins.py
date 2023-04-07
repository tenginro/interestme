from .db import db, environment, SCHEMA, add_prefix_for_prod

board_pins = db.Table(
    "board_pins",
    db.Model.metadata,
    db.Column("board_id", db.ForeignKey("boards.id"), primary_key=True),
    db.Column("pin_id", db.ForeignKey("pins.id"), primary_key=True)
)