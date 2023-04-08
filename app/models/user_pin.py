# from .db import db, SCHEMA, environment, add_prefix_for_prod

# # user_pins = db.Table(
# #     "user_pins",
# #     db.Model.metadata,
# #     db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
# #     db.Column("pin_id", db.ForeignKey(add_prefix_for_prod("pins.id")), primary_key=True)
# # )

# # if environment == "production":
# #     user_pins.schema = SCHEMA

# class User_Pins(db.Model):
#     __tablename__ = 'user_pins'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")), nullable=False)