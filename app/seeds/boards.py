from app.models import db, User, Board, environment, SCHEMA
from sqlalchemy.sql import text


# Adding Boards seed data
def seed_boards():
    board1 = Board(
        user_id=1,
        name="Dinner",
        description="A small description about this board",
        board_cover="https://i.pinimg.com/564x/c0/d9/03/c0d903836aa56019868e5f494cbccfea.jpg",
        secret=False,
    )

    board2 = Board(
        user_id=2,
        name="Art Inspiration",
        description="A small description about this board",
        board_cover="https://i.pinimg.com/564x/fc/a7/d6/fca7d61e33ddd7b42adea06281516910.jpg",
        secret=False,
    )
    board3 = Board(
        user_id=3,
        name="Technology",
        description="A small description about this board",
        board_cover="https://as2.ftcdn.net/v2/jpg/00/51/49/07/1000_F_51490712_YGjCvUhtV970HAB6KeB8jgyZbkPLKGvj.jpg",
        secret=True,
    )
    board4 = Board(
        user_id=4,
        name="Interior Design",
        description="A small description about this board",
        board_cover="https://as2.ftcdn.net/v2/jpg/02/77/47/57/1000_F_277475734_5s6TFy58PAKIkvGjp6YXkU1tg7MC8cr3.jpg",
        secret=True,
    )

    all_boards = [board1, board2, board3, board4]
    add_boards = [db.session.add(board) for board in all_boards]
    db.session.commit()
    return all_boards


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))
