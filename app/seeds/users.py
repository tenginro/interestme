from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name="Demo", last_name="Dem", email='demo@aa.io', password='password', profile_pic="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg", about="This guy is too lazy to do an introduction")
    marnie = User(
        username='marnie', first_name="Marnie", last_name="Mar",email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', first_name="Bobbie", last_name="Bob", email='bobbie@aa.io', password='password')
    john = User(
        username='john_doe', first_name="John", last_name="Doe", email='john_doe@aa.io', password='password')
    jane = User(
        username='jane_doe', first_name="Jane", last_name="Doe", email='jane_doe@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(jane)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()