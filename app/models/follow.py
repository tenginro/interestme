from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True),
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False),
    following_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    