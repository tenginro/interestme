from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Board, User, Pin
from ..forms import PinForm, BoardForm 


board_routes = Blueprint("boards", __name__)


@board_routes.route("boards/<int:id>", methods=["PATCH","PUT"])
@login_required
def update_board(id):
    user = current_user.to_dict()
    board = board.query.get(id)

    if board.user_id == user["id"]:
        form = BoardForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            board.name = form.data["name"]
            board.description = form.data["description"]
            board.secret = form.data['secret']
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


