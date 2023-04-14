from app.models import db, User, Board, environment, SCHEMA
from sqlalchemy.sql import text


# Adding Boards seed data
def seed_boards():
    board1 = Board(
        user_id=1,
        name="Board1",
        description="A small description about this board",
        board_cover="https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg",
        secret=False,
    )

    board2 = Board(
        user_id=2,
        name="Board2",
        description="A small description about this board",
        board_cover="https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg",
        secret=False,
    )
    board3 = Board(
        user_id=3,
        name="Board3",
        description="A small description about this board",
        board_cover="https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg",
        secret=True,
    )
    board4 = Board(
        user_id=4,
        name="Board4",
        description="A small description about this board",
        board_cover="https://as2.ftcdn.net/v2/jpg/03/64/76/97/1000_F_364769719_nOVnv8n06e2l2YS3u7NCwzcySTjD0YOe.jpg",
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
