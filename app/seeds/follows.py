from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text



def seed_follows():
    follow1 = Follow(
        user_id = 1,
        following_id = 2
    )
    follow2 = Follow(
        user_id = 1,
        following_id = 3
    )
    follow3 = Follow(
        user_id = 1,
        following_id = 4
    )
    follow4 = Follow(
        user_id = 1,
        following_id = 5
    )
    follow5 = Follow(
        user_id = 2,
        following_id = 1
    )
    follow6 = Follow(
        user_id = 2,
        following_id = 3
    )
    follow7 = Follow(
        user_id = 2,
        following_id = 4
    )
    follow8 = Follow(
        user_id = 2,
        following_id = 5
    )
    follow9 = Follow(
        user_id = 3,
        following_id = 1
    )
    follow10 = Follow(
        user_id = 3,
        following_id = 2
    )
    follow11 = Follow(
        user_id = 3,
        following_id = 4
    )
    follow12 = Follow(
        user_id = 3,
        following_id = 5
    )
    follow13 = Follow(
        user_id = 4,
        following_id = 1
    )
    follow14 = Follow(
        user_id = 4,
        following_id = 2
    )
    follow15 = Follow(
        user_id = 4,
        following_id = 3
    )
    follow16 = Follow(
        user_id = 4,
        following_id = 5
    )
    follow17 = Follow(
        user_id = 5,
        following_id = 1
    )
    follow18 = Follow(
        user_id = 5,
        following_id = 2
    )
    follow19 = Follow(
        user_id = 5,
        following_id = 3
    )
    follow20 = Follow(
        user_id = 5,
        following_id = 4
    )



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(jane)
    db.session.commit()

