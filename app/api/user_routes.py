from flask import Blueprint, jsonify
from flask_login import login_required
from ..models import User
from sqlalchemy.orm import joinedload, subqueryload

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.options(joinedload(User.following)).get(id)
    
    following = [followingUser.to_dict() for followingUser in user.following]
    
    followers = User.query.filter(User.following.any(id=id)).all()
    
    return {**user.to_dict(), "following": following, "followers": [follower.to_dict() for follower in followers]}