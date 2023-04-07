from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follows(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True),
    user_id = db.Column(db.Integer, db.ForeignKey("users.id")),
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"))