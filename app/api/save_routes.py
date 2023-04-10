from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Pin, User
from ..forms import PinForm

pin_routes = Blueprint("pins", __name__)

@pin_routes.route('pins/<int:id>/save', methods=['PATCH','PUT'])
@login_required
def save_pin(id):
    user = current_user.to_dict()
    pin = Pin.query.get(id)
    if request.body.boardId:
        board = Board.query.get(request.body.board.id)
        pin.boards.append(board)   
    pin.user_saved.append(user)
    return {**pin.to_dict()}
