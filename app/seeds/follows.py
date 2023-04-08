# from app.models import db, Follow, environment, SCHEMA
# from sqlalchemy.sql import text



# def seed_follows():
#     follow1 = Follow(
#         user_id = 1,
#         following_id = 2
#     )
#     follow2 = Follow(
#         user_id = 1,
#         following_id = 3
#     )
#     follow3 = Follow(
#         user_id = 1,
#         following_id = 4
#     )
#     follow4 = Follow(
#         user_id = 1,
#         following_id = 5
#     )
#     follow5 = Follow(
#         user_id = 2,
#         following_id = 1
#     )
#     follow6 = Follow(
#         user_id = 2,
#         following_id = 3
#     )
#     follow7 = Follow(
#         user_id = 2,
#         following_id = 4
#     )
#     follow8 = Follow(
#         user_id = 2,
#         following_id = 5
#     )
#     follow9 = Follow(
#         user_id = 3,
#         following_id = 1
#     )
#     follow10 = Follow(
#         user_id = 3,
#         following_id = 2
#     )
#     follow11 = Follow(
#         user_id = 3,
#         following_id = 4
#     )
#     follow12 = Follow(
#         user_id = 3,
#         following_id = 5
#     )
#     follow13 = Follow(
#         user_id = 4,
#         following_id = 1
#     )
#     follow14 = Follow(
#         user_id = 4,
#         following_id = 2
#     )
#     follow15 = Follow(
#         user_id = 4,
#         following_id = 3
#     )
#     follow16 = Follow(
#         user_id = 4,
#         following_id = 5
#     )
#     follow17 = Follow(
#         user_id = 5,
#         following_id = 1
#     )
#     follow18 = Follow(
#         user_id = 5,
#         following_id = 2
#     )
#     follow19 = Follow(
#         user_id = 5,
#         following_id = 3
#     )
#     follow20 = Follow(
#         user_id = 5,
#         following_id = 4
#     )



#     db.session.add(follow1)
#     db.session.add(follow2)
#     db.session.add(follow3)
#     db.session.add(follow4)
#     db.session.add(follow5)
#     db.session.add(follow6)
#     db.session.add(follow7)
#     db.session.add(follow8)
#     db.session.add(follow9)
#     db.session.add(follow10)
#     db.session.add(follow11)
#     db.session.add(follow12)
#     db.session.add(follow13)
#     db.session.add(follow14)
#     db.session.add(follow15)
#     db.session.add(follow16)
#     db.session.add(follow17)
#     db.session.add(follow18)
#     db.session.add(follow19)
#     db.session.add(follow20)


#     db.session.commit()

# def undo_follows():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM follows"))
        
#     db.session.commit()