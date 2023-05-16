from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from ..models import db, Pin, User, Board
from ..forms import PinForm


pin_routes = Blueprint("pins", __name__)


@pin_routes.route("/pins")
def get_all_pins():
    pins = Pin.query.all()
    all_pins = [
        {
            **pin.to_dict(),
            "User": pin.user.to_dict(),
            "boards": [board.to_dict() for board in pin.boards],
            "user_saved": [user.to_dict() for user in pin.user_saved],
        }
        for pin in pins
    ]
    return all_pins


@pin_routes.route("/pins/search/<string:searchQuery>")
def get_search_pins(searchQuery):
    pins = Pin.query.filter(
        db.or_(
            # ilike - case insensitive
            Pin.name.ilike(f"%{searchQuery}%"),
            Pin.description.ilike(f"%{searchQuery}%"),
            Pin.category.ilike(f"%{searchQuery}%"),
        )
    ).all()

    all_pins = [
        {
            **pin.to_dict(),
            "User": pin.user.to_dict(),
            "boards": [board.to_dict() for board in pin.boards],
            "user_saved": [user.to_dict() for user in pin.user_saved],
        }
        for pin in pins
    ]
    return all_pins


@pin_routes.route("/pins/<int:id>")
def get_pins_by_id(id):
    pin = Pin.query.get(id)
    return {
        **pin.to_dict(),
        "User": pin.user.to_dict(),
        "boards": [board.to_dict() for board in pin.boards],
        "user_saved": [user.to_dict() for user in pin.user_saved],
    }


@pin_routes.route("/pins/current")
def get_user_pins():
    user = current_user.to_dict()
    user_pins = Pin.query.filter(Pin.user_id == user["id"])
    pins = [
        {
            **pin.to_dict(),
            "User": pin.user.to_dict(),
            "boards": [board.to_dict() for board in pin.boards],
            "user_saved": [user.to_dict() for user in pin.user_saved],
        }
        for pin in user_pins
    ]

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
            user_id=user["id"],
            name=form.data["name"],
            description=form.data["description"],
            category=form.data["category"],
            url=form.data["url"],
        )
        db.session.add(new_pin)
        db.session.commit()
        return {"pin": new_pin.to_dict(), "User": new_pin.user.to_dict()}
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": "Bad Data"}


@pin_routes.route("pins/<int:id>", methods=["PATCH", "PUT"])
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
            return {
                "pin": updated_pin.to_dict(),
                "User": pin.user.to_dict(),
                "boards": [board.to_dict() for board in pin.boards],
                "user_saved": [user.to_dict() for user in pin.user_saved],
            }
        if form.errors:
            return {
                "message": "form errors",
                "statusCode": 400,
                "errors": f"{form.errors}",
            }

    return {"message": "User does not own this pin"}


@pin_routes.route("pins/<int:id>", methods=["DELETE"])
@login_required
def delete_pin(id):
    pin = Pin.query.get(id)
    user = current_user
    if pin:
        db.session.delete(pin)

        if pin in user.saved_pins:
            user.saved_pins.remove(pin)

        db.session.commit()
        return {"message": "Pin Deleted!"}
    return {"message": "Pin not found"}


@pin_routes.route("pins/<int:id>/save", methods=["PATCH"])
@login_required
def save_pin(id):
    user = current_user
    pin = Pin.query.get(id)

    request_obj = request.get_json()
    if request_obj:
        boardId = request_obj["id"]

        if boardId:
            board = Board.query.get(boardId)
            if board.user_id == user.id:
                if pin.boards:
                    if board not in pin.boards:
                        pin.boards.append(board)
                else:
                    pin.boards = []
                    pin.boards.append(board)
            else:
                return {"message": "User does not own this board"}
    else:
        if pin.user_saved:
            if user not in pin.user_saved:
                pin.user_saved.append(user)
        else:
            pin.user_saved = []
            pin.user_saved.append(user)

    db.session.commit()

    user = User.query.get(user.id)
    savedPins = user.saved_pins
    return [
        {
            **pin.to_dict(),
            "User": pin.user.to_dict(),
            "boards": [board.to_dict() for board in pin.boards],
            "user_saved": [user.to_dict() for user in pin.user_saved],
        }
        for pin in savedPins
    ]


@pin_routes.route("pins/<int:id>/unsave", methods=["PATCH"])
@login_required
def unsave_pin(id):
    user = current_user
    pin = Pin.query.get(id)

    request_obj = request.get_json()
    if request_obj:
        board = Board.query.get(request_obj["id"])
        pin.boards.remove(board)
    else:
        pin.user_saved.remove(user)

    db.session.commit()

    user = User.query.get(user.id)
    savedPins = user.saved_pins
    return [
        {
            **pin.to_dict(),
            "User": pin.user.to_dict(),
            "boards": [board.to_dict() for board in pin.boards],
            "user_saved": [user.to_dict() for user in pin.user_saved],
        }
        for pin in savedPins
    ]
