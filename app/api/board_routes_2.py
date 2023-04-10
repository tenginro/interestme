from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Board, User, Pin
from ..forms import PinForm, BoardForm 


board_routes = Blueprint("boards", __name__)





