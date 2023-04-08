from flask import Blueprint

from ..models import db, Pin


pin = Blueprint("pins", __name__)


@pin.route("/pins")
def get_all_pins():
    pins = Pin.query.all()
    all_pins = [pin.to_dict() for pin in pins]
    return all_pins



