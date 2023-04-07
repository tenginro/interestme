from .db import db, environment, SCHEMA, add_prefix_for_prod

board_pins = db.Table(
    "board_pins",
    db.Model.metadata,
    db.Column("board_id", db.ForeignKey(add_prefix_for_prod("boards.id"))),
    db.Column("pin_id", db.ForeignKey(add_prefix_for_prod("pins.id")))
)

if environment == "production":
    board_pins.schema = SCHEMA