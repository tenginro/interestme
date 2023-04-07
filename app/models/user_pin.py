from .db import db, SCHEMA, environment, add_prefix_for_prod

user_pins = db.Table(
    "user_pins",
    db.Model.metadata,
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("pin_id", db.ForeignKey(add_prefix_for_prod("pins.id")), primary_key=True)
)

if environment == "production":
    user_pins.schema = SCHEMA
