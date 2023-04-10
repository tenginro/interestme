from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Pin, User
from ..forms import PinForm


pin = Blueprint("pins", __name__)


@pin.route("/pins")
def get_all_pins():
    pins = Pin.query.all()
    all_pins = [pin.to_dict() for pin in pins]
    return all_pins

@pin.route("/pins/<int:id>")
def get_pins_by_id(id):
    single_pin = Pin.query.get(id)
    return single_pin.to_dict()


@pin.route("/pins/current")
def get_user_pins():
    user = current_user.to_dict()
    user_pins = Pin.query.filter(Pin.user_id == user["id"])
    pins = [pin.to_dict() for pin in user_pins]
    return pins

@pin.route("/pins", methods=["POST"])
def create_pin():
    user = current_user.to_dict()
    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_pin = Pin(
            user_id = user["id"],
            name = form.data["name"],
            description = form.data["description"],
            category_id = form.data["category_id"],
            url = form.data["url"]
        )
        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict()
    if form.errors:
        return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
    return {"message": 'Bad Data', "statusCode": 400}

@pin.route("pins/<int:id>", methods=["PUT"])
def update_pin(id):
    user = current_user.to_dict()
    pin = Pin.query.get(id)

    if pin["user_id"] == user["id"]:
        form = PinForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            pin.name = form.data["name"]
            pin.description = form.data["description"]
            pin.category = form.data["category"]
            pin.url = form.data["url"]
            db.session.commit()
            updated_pin = Pin.query.get(id)
            return updated_pin.to_dict()
        if form.errors:
            return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}
    return {"message": 'User does not own this pin', "statusCode": 400}

@pin.route("pins/<int:id>", methods=["DELETE"])
def delete_pin(id):
    pin = Pin.query.get(id)
    if pin:
        db.session.delete(pin)
        db.session.commit()
        return {"message":'Pin Deleted!'}
    return {"message": 'Pin not found', "statusCode": 404}


