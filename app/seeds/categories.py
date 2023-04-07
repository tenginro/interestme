from app.models.category import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_category():
    category1 = Category(name="Food")
    category2 = Category(name="Tech")
    category3 = Category(name="Car")

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)


def undo_category():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
