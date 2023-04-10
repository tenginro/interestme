# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Follow(db.Model):
#     __tablename__ = 'follows'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
#     following_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)


from .db import db, environment, SCHEMA, add_prefix_for_prod

follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column('following_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

if environment == "production":
    follows.schema = SCHEMA
