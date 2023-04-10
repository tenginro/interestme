from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Board, User, Pin
from ..forms import BoardForm


board_routes = Blueprint("boards", __name__)

# boards can only be in saved page
@board_routes.route("/boards")
@login_required
def get_user_boards():
    user = current_user.to_dict()
    user_boards = Board.query.filter(Board.user_id == user["id"])
    boards = [{**board.to_dict(), "Pins": [pin.to_dict() for pin in board.pins]} for board in user_boards]
    return boards

@board_routes.route("/boards/<int:id>")
@login_required
def get_boards_by_id(id):
    user = current_user.to_dict()
    board = Board.query.get(id)
    if board:
        if board.user_id == user["id"]:
            pins = [pin.to_dict() for pin in board.pins]
            return {**board.to_dict(), "Pins": pins}
        else:
            return {"message": 'User does not own this board'}
    else:
        return {"message": 'Board not found'}

@board_routes.route("/boards", methods=["POST"])
@login_required
def create_board():
    user = current_user.to_dict()
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new_board = Board(
            user_id = user["id"],
            name = form.data["name"],
            description = form.data["description"],
            secret = form.data["secret"],
        )
        db.session.add(new_board)
        db.session.commit()
        return {"board": new_board.to_dict()}
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}

