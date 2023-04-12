from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text

from random import choice, sample, randint

def seed_pins(all_boards, all_users):

    
    pin1 = Pin(
        user_id=1,
        name="Fruit",
        description="Food Fruit",
        category='Food',
        url="https://as2.ftcdn.net/v2/jpg/00/82/91/29/1000_F_82912936_VKERwIHOojNPjQLXfdeBPrqCIy3q1GHM.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin2 = Pin(
        user_id=1,
        name="Color",
        description="Monet",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/05/76/43/74/1000_F_576437402_gKJQCzFNw9Ev8cfuz1180FBg9l86RPx6.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin3 = Pin(
        user_id=1,
        name="Technology",
        description="Tech Tech Tech",
        category='Tech',
        url="https://as1.ftcdn.net/v2/jpg/01/52/61/36/1000_F_152613619_kaNluqI3oUjvIhEQDcDfuksXknNJ45lf.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin4 = Pin(
        user_id=2,
        name="Pot",
        description="Food Hot Pot",
        category='Food',
        url="https://as1.ftcdn.net/v2/jpg/03/65/52/78/1000_F_365527811_NX6tfX4sbloqPlzVO3J2ArD92rIT4HoH.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin5 = Pin(
        user_id=2,
        name="SunDay",
        description="Sun Day Picture",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/03/15/85/90/1000_F_315859031_5mqyTgkmJYO8J1ig5jxuQDIXJE48Q9zL.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin6 = Pin(
        user_id=2,
        name="Technology",
        description="Tech Tech Tech",
        category='Tech',
        url="https://as1.ftcdn.net/v2/jpg/02/11/09/58/1000_F_211095871_r74aavHAmiLk8xeCuL3SBfnOivgsj0ZQ.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin7 = Pin(
        user_id=3,
        name="Soda",
        description="Food Soda",
        category='Food',
        url="https://i.pinimg.com/564x/bf/ab/78/bfab7840c6e176178b94d2aabe7ce703.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin8 = Pin(
        user_id=3,
        name="Technology",
        description="Tech Picture",
        category='Tech',
        url="https://as1.ftcdn.net/v2/jpg/02/98/00/02/1000_F_298000277_BGQ5Xde9HKvc3aRji8PoBHWV14RDBxxC.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin9 = Pin(
        user_id=3,
        name="Sky",
        description="Sky Sky Star",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/05/34/74/20/1000_F_534742003_R9oC0ejK0a2UXmtVLV2hFKbA0sjKP79g.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin10 = Pin(
        user_id=4,
        name="Salad",
        description="Food Salad",
        category='Food',
        url="https://as1.ftcdn.net/v2/jpg/03/21/34/26/1000_F_321342613_tX7IK69S1SK3XD3ZzWQUnaaDW36jR2nA.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin11 = Pin(
        user_id=4,
        name="Sunflower",
        description="SunFlower Picture",
        category='Art',
        url="https://as2.ftcdn.net/v2/jpg/03/30/37/83/1000_F_330378374_FJ0SNG7Wiz97PXlDL9Y7F9JENVFldZLj.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    pin12 = Pin(
        user_id=4,
        name="Flower",
        description="Flower Flower Flower",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/05/17/11/02/1000_F_517110230_pP1pTKZtmv7ZRWaKa0GNMCJBHS454S5W.jpg",
        boards=sample(all_boards, randint(0, len(all_boards))),
        user_saved=sample(all_users, randint(0, len(all_users)))
    )

    all_pins = [
        pin1,
        pin2,
        pin3,
        pin4,
        pin5,
        pin6,
        pin7,
        pin8,
        pin9,
        pin10,
        pin11,
        pin12,
    ]
    add_pins = [db.session.add(pin) for pin in all_pins]
    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
