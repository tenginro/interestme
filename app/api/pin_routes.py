from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Pin, User, Board
from ..forms import PinForm


pin_routes = Blueprint("pins", __name__)


@pin_routes.route("/pins")
def get_all_pins():
    pins = Pin.query.all()
    all_pins = [{**pin.to_dict(), "User":pin.user.to_dict()} for pin in pins]
    
    return all_pins

@pin_routes.route("/pins/<int:id>")
def get_pins_by_id(id):
    pin = Pin.query.get(id)
    return {**pin.to_dict(), "User": pin.user.to_dict()}


@pin_routes.route("/pins/current")
def get_user_pins():
    user = current_user.to_dict()
    user_pins = Pin.query.filter(Pin.user_id == user["id"])
    pins = [pin.to_dict() for pin in user_pins]
    return pins

# saved pins

@pin_routes.route("/pins", methods=["POST"])
@login_required
def create_pin():
    user = current_user.to_dict()
    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        new_pin = Pin(
            user_id = user["id"],
            name = form.data["name"],
            description = form.data["description"],
            category = form.data["category"],
            url = form.data["url"]
        )
        db.session.add(new_pin)
        db.session.commit()
        return {"pin": new_pin.to_dict()}
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}

@pin_routes.route("pins/<int:id>", methods=["PATCH","PUT"])
@login_required
def update_pin(id):
    user = current_user.to_dict()
    pin = Pin.query.get(id)

    if pin.user_id == user["id"]:
        form = PinForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            pin.name = form.data["name"]
            pin.description = form.data["description"]
            pin.category = form.data["category"]
            db.session.commit()
            updated_pin = Pin.query.get(id)
            return {"pin": updated_pin.to_dict()}
        if form.errors:
            return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
    return {"message": 'User does not own this pin'}

@pin_routes.route("pins/<int:id>", methods=["DELETE"])
@login_required
def delete_pin(id):
    pin = Pin.query.get(id)
    if pin:
        db.session.delete(pin)
        db.session.commit()
        return {"message":'Pin Deleted!'}
    return {"message": 'Pin not found'}




@pin_routes.route('pins/<int:id>/save', methods=['PATCH','PUT'])
@login_required
def save_pin(id):
    user = current_user.to_dict()
    pin = Pin.query.get(id)
    boardId = request.get_json()["boardId"]
    print("boardId", boardId)
    if boardId:
        board = Board.query.get(boardId)
        pin.boards.append(board)   
    pin.user_saved.append(user)
    return {**pin.to_dict(), "boards": pin.boards, "user_saved": pin.user_saved}

@pin_routes.route('pins/<int:id>/unsave', methods=['PATCH','PUT'])
@login_required
def unsave_pin(id):
    user = current_user.to_dict()
    pin = Pin.query.get(id)
    if request.boardId:
        board = Board.query.get(request.board.id)
        pin.boards.pop(board.id)   
    pin.user_saved.pop(user.id)
    return {**pin.to_dict()}