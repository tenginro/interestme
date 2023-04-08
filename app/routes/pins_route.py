from flask import Blueprint

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

