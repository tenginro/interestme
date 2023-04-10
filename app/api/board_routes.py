from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Board, User, Pin
from ..forms import PinForm


board_routes = Blueprint("boards", __name__)


# @board_routes.route("/boards")
# def get_all_boards():
#     boards = Board.query.all()
#     all_boards = [board.to_dict() for board in boards]
#     return all_boards

# boards can only be in saved page
@board_routes.route("/boards/current")
@login_required
def get_user_boards():
    user = current_user.to_dict()
    user_boards = Board.query.filter(Board.user_id == user["id"])
    boards = [board.to_dict() for board in user_boards]
    return boards

@board_routes.route("/boards/current/<int:id>")
@login_required
def get_boards_by_id(id):
    user = current_user.to_dict()
    single_board = Board.query.get(id)
    if single_board.user_id == user["id"]:
        return single_board.to_dict()
    else:
        return {"message": 'the board is not owned by you'}


@board_routes.route("/boards", methods=["POST"])
@login_required
def create_board():
    user = current_user.to_dict()
    form = boardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new_board = Board(
            user_id = user["id"],
            name = form.data["name"],
            description = form.data["description"],
            category = form.data["category"],
            url = form.data["url"]
        )
        db.session.add(new_board)
        db.session.commit()
        return {"board": new_board.to_dict()}
    if form.errors:
        return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
    return {"message": 'Bad Data', "statusCode": 400}

@board_routes.route("boards/<int:id>", methods=["PATCH","PUT"])
@login_required
def update_board(id):
    user = current_user.to_dict()
    board = board.query.get(id)

    if board.user_id == user["id"]:
        form = boardForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            board.name = form.data["name"]
            board.description = form.data["description"]
            board.category = form.data["category"]
            # board.url = form.data["url"]
            db.session.commit()
            updated_board = board.query.get(id)
            return {"board": updated_board.to_dict()}
        if form.errors:
            return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
    return {"message": 'User does not own this board', "statusCode": 400}

@board_routes.route("boards/<int:id>", methods=["DELETE"])
@login_required
def delete_board(id):
    board = board.query.get(id)
    if board:
        db.session.delete(board)
        db.session.commit()
        return {"message":'board Deleted!'}
    return {"message": 'board not found', "statusCode": 404}

