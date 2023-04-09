from flask import Blueprint
from flask_login import current_user

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
    form = PinForm()
    if form.validate_on_submit():
        new_pin = Pin({
            "name": form.data["name"],
            "description": form.data["description"],
            "category": form.data["category"],
            "url": form.data["url"]
        })
        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict()
    return 'Bad Data'

@pin.route("pins/<int:id>", methods=["PUT"])
def update_pin(id):

    pin = Pin.query.get(id)
    form = PinForm()
    if form.validate_on_submit():
        pin.name = form.data["name"]
        pin.description = form.data["description"]
        pin.category = form.data["category"]
        pin.url = form.data["url"]
        db.session.commit()
        updated_pin = Pin.query.get(id)
        return updated_pin.to_dict()
    return 'Bad Data'

@pin.route("pins/<int:id>", methods=["DELETE"])
def delete_pin(id):
    pin = Pin.query.get(id)
    if pin:
        db.session.delete(pin)
        db.session.commit()
        return 'Pin Deleted!'
    return 'Pin not found!'


