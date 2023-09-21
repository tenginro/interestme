from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="john_doe",
        first_name="John",
        last_name="Doe",
        email="demouser@aa.io",
        password="password",
        profile_pic="https://mypaintingclub.com/images/modules/main/219_5946_Bamsi.jpg",
        about="This guy is too lazy to do an introduction",
    )
    user1 = User(
        username="jane_doe",
        first_name="Jane",
        last_name="Doe",
        email="janedoe@aa.io",
        password="password",
        profile_pic="https://i.pinimg.com/736x/28/d2/d8/28d2d8924d9c60309f3f15bf5e0ec98d.jpg",
    )
    user2 = User(
        username="john_smith",
        first_name="John",
        last_name="Smith",
        email="johnsmith@aa.io",
        password="password",
        profile_pic="https://i.etsystatic.com/24137450/r/il/ef0420/2593836978/il_fullxfull.2593836978_igpi.jpg",
    )
    user3 = User(
        username="jane_smith",
        first_name="Jane",
        last_name="Smith",
        email="janesmith@aa.io",
        password="password",
        profile_pic="https://images.saatchiart.com/saatchi/879769/art/5578841/4648651-HSC00001-7.jpg",
    )
    user4 = User(
        username="bill_jameson",
        first_name="Bill",
        last_name="Jameson",
        email="billjameson@aa.io",
        password="password",
        profile_pic="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/german-shepherd-puppy-portrait-jai-johnson.jpg",
    )

    demo.following.append(user1)
    demo.following.append(user2)
    demo.following.append(user3)
    demo.following.append(user4)

    user1.following.append(demo)
    user1.following.append(user2)
    user1.following.append(user3)
    user1.following.append(user4)

    user2.following.append(demo)
    user2.following.append(user1)
    user2.following.append(user3)

    user3.following.append(demo)
    user3.following.append(user1)
    user3.following.append(user2)
    user3.following.append(user4)

    all_users = [demo, user1, user2, user3, user4]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()
    return all_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't have a built in function to do this. With postgres in production TRUNCATE removes all the data from the table, and RESET IDENTITY resets the auto incrementing primary key, CASCADE deletes any dependent entities.  With sqlite3 in development you need to instead use DELETE to remove all data and it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
