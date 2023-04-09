from flask import Blueprint
from flask_login import current_user

from ..models import db, Pin, User


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

