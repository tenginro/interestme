from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text

from random import choice, sample, randint

def seed_pins(all_boards, all_users):

    
    user1pin1 = Pin(
        user_id=1,
        name="Fruit",
        description="Food Fruit",
        category='Food',
        url="https://as2.ftcdn.net/v2/jpg/00/82/91/29/1000_F_82912936_VKERwIHOojNPjQLXfdeBPrqCIy3q1GHM.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin2 = Pin(
        user_id=1,
        name="Color",
        description="Monet",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/05/76/43/74/1000_F_576437402_gKJQCzFNw9Ev8cfuz1180FBg9l86RPx6.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin3 = Pin(
        user_id=1,
        name="Technology",
        description="Tech Tech Tech",
        category='Tech',
        url="https://as1.ftcdn.net/v2/jpg/01/52/61/36/1000_F_152613619_kaNluqI3oUjvIhEQDcDfuksXknNJ45lf.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin4 = Pin(
        user_id=1,
        name="Ramen Noodles",
        description="Saucy ramen noodles recipe with a thick and flavourful sauce!",
        category='Food',
        url="https://i.pinimg.com/564x/4c/34/f0/4c34f0e70d69de7ca67c61cc6457d0b1.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin5 = Pin(
        user_id=1,
        name="Caption This",
        description="What would you caption this art image?",
        category='Art',
        url="https://i.pinimg.com/564x/f0/bf/04/f0bf0489419fd0980e4bdced3754d944.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin6 = Pin(
        user_id=1,
        name="Tech Cave",
        description="This is a tech cave",
        category='Tech',
        url="https://i.pinimg.com/564x/65/3c/75/653c759f23a58107ca0ff57de215d149.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin7 = Pin(
        user_id=1,
        name="Pork Banh Mi Burger",
        description="We love burgers, and we love banh mi.",
        category='Food',
        url="https://i.pinimg.com/564x/70/6b/b6/706bb6e7818fde809c9cde58be61adc1.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin8 = Pin(
        user_id=1,
        name="Pixel Jeff",
        description="Pixel Jeff X Divoom -Ditoo (tribute artwork)",
        category='Art',
        url="https://i.pinimg.com/originals/1a/71/58/1a7158689e5ce37e5d78d97c332a003f.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user1pin9 = Pin(
        user_id=1,
        name="Motion Graphics",
        description="Motion Graphics gif",
        category='Tech',
        url="https://i.pinimg.com/originals/88/15/63/881563d6444b370fa4ceea0c3183bb4c.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )
    user1pin10 = Pin(
        user_id=1,
        name="Anime Food Gif",
        description="Anime Food Gif",
        category='Food',
        url="https://i.pinimg.com/originals/5d/6c/d2/5d6cd2aade4690c7770dd403596f9499.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin1 = Pin(
        user_id=2,
        name="Pot",
        description="Food Hot Pot",
        category='Food',
        url="https://as1.ftcdn.net/v2/jpg/03/65/52/78/1000_F_365527811_NX6tfX4sbloqPlzVO3J2ArD92rIT4HoH.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin2 = Pin(
        user_id=2,
        name="SunDay",
        description="Sun Day Picture",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/03/15/85/90/1000_F_315859031_5mqyTgkmJYO8J1ig5jxuQDIXJE48Q9zL.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin3 = Pin(
        user_id=2,
        name="Technology",
        description="Tech Tech Tech",
        category='Tech',
        url="https://as1.ftcdn.net/v2/jpg/02/11/09/58/1000_F_211095871_r74aavHAmiLk8xeCuL3SBfnOivgsj0ZQ.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin4 = Pin(
        user_id=2,
        name="Garlic Butter Steak",
        description="Garlic Butter Steak and Potatoes Skillet",
        category='Food',
        url="https://i.pinimg.com/564x/d6/a4/4b/d6a44b660716bb50c4c8d01db519202b.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin5 = Pin(
        user_id=2,
        name="Anime Fan Art",
        description="Chainsaw Man anime fan art",
        category='Art',
        url="https://i.pinimg.com/564x/a1/bd/d9/a1bdd99e441fd310e76e0d49f0677a60.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin6 = Pin(
        user_id=2,
        name="Apple Products",
        description="Which Apple products are really worth your money?",
        category='Tech',
        url="https://i.pinimg.com/564x/e6/4d/84/e64d84f2873f0b37c2795f180de437c3.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin7 = Pin(
        user_id=2,
        name="Pokemon Snack",
        description="Pokemon snack, fully edible",
        category='Food',
        url="https://i.pinimg.com/564x/e0/20/be/e020bea99b4434b9e3b3cb2c60acae84.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin8 = Pin(
        user_id=2,
        name="Mastermind Pixel Gif",
        description="Pixel Animation for X-Team Radio X-Team Radio",
        category='Art',
        url="https://i.pinimg.com/originals/77/ca/a3/77caa32884d735d439ade45ba37feaf2.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )
    user2pin9 = Pin(
        user_id=2,
        name="Loop Techno Gif",
        description="Loop Techno Gif",
        category='Tech',
        url="https://i.pinimg.com/originals/e7/19/3d/e7193dd881c18d15ce79d8fa6d64329e.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user2pin10 = Pin(
        user_id=2,
        name="Pancake Gif",
        description="This is a pancake dripping syrup gif",
        category='Food',
        url="https://i.pinimg.com/originals/6e/e0/19/6ee019f9939a9b29068aa58197bb438d.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin1 = Pin(
        user_id=3,
        name="Soda",
        description="Food Soda",
        category='Food',
        url="https://i.pinimg.com/564x/bf/ab/78/bfab7840c6e176178b94d2aabe7ce703.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin2 = Pin(
        user_id=3,
        name="Technology",
        description="Tech Picture",
        category='Tech',
        url="https://as1.ftcdn.net/v2/jpg/02/98/00/02/1000_F_298000277_BGQ5Xde9HKvc3aRji8PoBHWV14RDBxxC.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin3 = Pin(
        user_id=3,
        name="Sky",
        description="Sky Sky Star",
        category='Art',
        url="https://as1.ftcdn.net/v2/jpg/05/34/74/20/1000_F_534742003_R9oC0ejK0a2UXmtVLV2hFKbA0sjKP79g.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin4 = Pin(
        user_id=3,
        name="Tonkotsu Ramen",
        description="A tasty homemade tonkotsu (pork) ramen with homemade ramen broth, chashu (pork belly) and ajitsuke tamago (ramen eggs) that is just packed with flavour!",
        category='Food',
        url="https://i.pinimg.com/564x/67/bb/45/67bb459686a411be5928559827b01728.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin5 = Pin(
        user_id=3,
        name="Hacker",
        description="Top view of unrecognizable hacker performing cyberattack at night",
        category='Tech',
        url="https://i.pinimg.com/564x/94/50/4c/94504c81d1e288e9b8694017f4ec6510.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin6 = Pin(
        user_id=3,
        name="City Art",
        description="Painting of retro-looking city with skyscrapers",
        category='Art',
        url="https://i.pinimg.com/564x/af/9d/b3/af9db33b2ed8d12b5d7df2cda9aea98e.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin7 = Pin(
        user_id=3,
        name="Chinese BBQ Pork Steamed Buns",
        description="Homemade pork buns fresh from the steamer are a delight to eat",
        category='Food',
        url="https://i.pinimg.com/564x/77/2b/10/772b10d66477db2725d569b84109a9ad.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin8 = Pin(
        user_id=3,
        name="Startup Tech Gif",
        description="Binary-like startup sequence gif",
        category='Tech',
        url="https://i.pinimg.com/originals/84/53/be/8453bedc2350e1878e07bbb05cd13765.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin9 = Pin(
        user_id=3,
        name="Retro 8-Bit Gif",
        description="Retro 8-bit gif",
        category='Art',
        url="https://i.pinimg.com/originals/04/63/19/046319f50d5c5cfa3d92a2d683fd2ff3.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user3pin10 = Pin(
        user_id=3,
        name="Anime Strawberries Gif",
        description="Anime strawberries gif",
        category='Food',
        url="https://i.pinimg.com/originals/e1/dd/79/e1dd79b2ce724ed6cb983dd59f18ec6f.gif",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin1 = Pin(
        user_id=4,
        name="Salad",
        description="Food Salad",
        category='Food',
        url="https://as1.ftcdn.net/v2/jpg/03/21/34/26/1000_F_321342613_tX7IK69S1SK3XD3ZzWQUnaaDW36jR2nA.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin2 = Pin(
        user_id=4,
        name="Sunflower",
        description="SunFlower Picture",
        category='Art',
        url="https://as2.ftcdn.net/v2/jpg/03/30/37/83/1000_F_330378374_FJ0SNG7Wiz97PXlDL9Y7F9JENVFldZLj.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin3 = Pin(
        user_id=4,
        name="Flower",
        description="Flower Flower Flower",
        category='Art',
        url="https://as2.ftcdn.net/v2/jpg/01/35/49/05/1000_F_135490522_9GD4FaP2KSNq3hHWtQiW5rwbRzvRaaqZ.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin4 = Pin(
        user_id=4,
        name="Halloumi Burgers",
        description="Halloumi Burgers with juicy mushrooms and a sticky sweet sauce",
        category='Food',
        url="https://i.pinimg.com/564x/57/78/f4/5778f4a3c1554a60a9673c14be613c70.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin5 = Pin(
        user_id=4,
        name="Electric Brain",
        description="Logo for an electric brain",
        category='Tech',
        url="https://i.pinimg.com/564x/c4/06/28/c406280d81f7e0e32f6b5f3af36d4282.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin6 = Pin(
        user_id=4,
        name="Art Logo Handmande",
        description="Handmade, pencil stencil of art",
        category='Art',
        url="https://i.pinimg.com/564x/ac/1e/8c/ac1e8c65a0fcd8767c32da2c90f993fb.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin7 = Pin(
        user_id=4,
        name="Best Pizza",
        description="Homemade pizza with the best dough",
        category='Food',
        url="https://i.pinimg.com/564x/4d/8b/ce/4d8bce02999b38314e48ea984f015fe0.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin8 = Pin(
        user_id=4,
        name="Technology Background",
        description="Blue artificial intelligence technology background",
        category='Tech',
        url="https://i.pinimg.com/564x/f4/1b/75/f41b759fa180a555152a93d3ab22d96a.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin9 = Pin(
        user_id=4,
        name="Fan Made Nike Logo",
        description="Fan made Nike logo by an illustrator",
        category='Art',
        url="https://i.pinimg.com/564x/d3/24/6b/d3246bb9f3cdb77d704037bd0f3754b3.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    user4pin10 = Pin(
        user_id=4,
        name="The Ultimate Double Cheeseburger",
        description="Fan made Nike logo by an illustrator",
        category='Food',
        url="https://i.pinimg.com/564x/05/8c/19/058c19fd894ab1da3cb2609ab4c4bc6c.jpg",
        # boards=sample(all_boards, randint(0, len(all_boards))),
        # user_saved=sample(all_users, randint(0, len(all_users)))
    )

    all_pins = [
        user1pin1,
        user1pin2,
        user1pin3,
        user1pin4,
        user1pin5,
        user1pin6,
        user1pin7,
        user1pin8,
        user1pin9,
        user1pin10,
        user2pin1,
        user2pin2,
        user2pin3,
        user2pin4,
        user2pin5,
        user2pin6,
        user2pin7,
        user2pin8,
        user2pin9,
        user2pin10,
        user3pin1,
        user3pin2,
        user3pin3,
        user3pin4,
        user3pin5,
        user3pin6,
        user3pin7,
        user3pin8,
        user3pin9,
        user3pin10,
        user4pin1,
        user4pin2,
        user4pin3,
        user4pin4,
        user4pin5,
        user4pin6,
        user4pin7,
        user4pin8,
        user4pin9,
        user4pin10
    ]
    add_pins = [db.session.add(pin) for pin in all_pins]
    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
