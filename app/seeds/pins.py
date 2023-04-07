from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pins():
    pin1 = Pin(
        user_id=1,
        board_id=1,
        name="Fruit",
        description="Food Fruit",
        category_id=2,
        url="https://as2.ftcdn.net/v2/jpg/00/82/91/29/1000_F_82912936_VKERwIHOojNPjQLXfdeBPrqCIy3q1GHM.jpg",
    )

    pin2 = Pin(
        user_id=1,
        board_id=1,
        name="Color",
        description="Color Color Color",
        category_id=1,
        url="https://as1.ftcdn.net/v2/jpg/02/28/18/62/1000_F_228186227_hTEQS8k4VtopmEVnkBbPvOaSIfXsqWON.jpg",
    )

    pin3 = Pin(
        user_id=1,
        board_id=1,
        name="Technology",
        description="Tech Tech Tech",
        category_id=3,
        url="https://as1.ftcdn.net/v2/jpg/01/52/61/36/1000_F_152613619_kaNluqI3oUjvIhEQDcDfuksXknNJ45lf.jpg",
    )

    pin4 = Pin(
        user_id=2,
        board_id=2,
        name="Soda",
        description="Food Soda",
        category_id=1,
        url="https://i.pinimg.com/564x/bf/ab/78/bfab7840c6e176178b94d2aabe7ce703.jpg",
    )

    pin5 = Pin(
        user_id=2,
        board_id=2,
        name="Sun",
        description="Sun Picture",
        category_id=2,
        url="https://as1.ftcdn.net/v2/jpg/03/15/85/90/1000_F_315859031_5mqyTgkmJYO8J1ig5jxuQDIXJE48Q9zL.jpg",
    )

    pin6 = Pin(
        user_id=2,
        board_id=2,
        name="Technology",
        description="Tech Tech Tech",
        category_id=3,
        url="https://as1.ftcdn.net/v2/jpg/05/34/74/20/1000_F_534742003_R9oC0ejK0a2UXmtVLV2hFKbA0sjKP79g.jpg",
    )

    pin7 = Pin(
        user_id=3,
        board_id=3,
        name="Soda",
        description="Food Soda",
        category_id=1,
        url="https://i.pinimg.com/564x/bf/ab/78/bfab7840c6e176178b94d2aabe7ce703.jpg",
    )

    pin8 = Pin(
        user_id=3,
        board_id=3,
        name="Sun",
        description="Sun Picture",
        category_id=2,
        url="https://as2.ftcdn.net/v2/jpg/03/30/37/83/1000_F_330378374_FJ0SNG7Wiz97PXlDL9Y7F9JENVFldZLj.jpg",
    )

    pin9 = Pin(
        user_id=3,
        board_id=3,
        name="Technology",
        description="Tech Tech Tech",
        category_id=3,
        url="https://as1.ftcdn.net/v2/jpg/05/34/74/20/1000_F_534742003_R9oC0ejK0a2UXmtVLV2hFKbA0sjKP79g.jpg",
    )

    pin10 = Pin(
        user_id=4,
        board_id=4,
        name="Salad",
        description="Food Salad",
        category_id=1,
        url="https://as1.ftcdn.net/v2/jpg/03/21/34/26/1000_F_321342613_tX7IK69S1SK3XD3ZzWQUnaaDW36jR2nA.jpg",
    )

    pin11 = Pin(
        user_id=4,
        board_id=4,
        name="Sunflower",
        description="SunFlower Picture",
        category_id=2,
        url="https://as2.ftcdn.net/v2/jpg/03/30/37/83/1000_F_330378374_FJ0SNG7Wiz97PXlDL9Y7F9JENVFldZLj.jpg",
    )

    pin12 = Pin(
        user_id=4,
        board_id=4,
        name="Technology",
        description="Tech Tech Tech",
        category_id=3,
        url="https://as1.ftcdn.net/v2/jpg/05/34/74/20/1000_F_534742003_R9oC0ejK0a2UXmtVLV2hFKbA0sjKP79g.jpg",
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
