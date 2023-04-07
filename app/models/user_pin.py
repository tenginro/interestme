
user_pins = db.Table(
    "user_pins",
    db.Model.metadata,
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("pin_id", db.ForeignKey("pins.id"), primary_key=True)
)