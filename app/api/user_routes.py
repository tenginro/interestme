from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models import User
from sqlalchemy.orm import joinedload, subqueryload
from sqlalchemy.sql import exists

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
    # user = User.query.options(joinedload(User.following)).get(id)
    
    this_user=User.query.get(id)
    following = [followingUser.to_dict() for followingUser in this_user.following]
    
    allUsers = User.query.all()
    followers = [user for user in allUsers if this_user in user.following]

    return {**this_user.to_dict(), "following": following, "followers": [follower.to_dict() for follower in followers]}


@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def following(id):
    user_to_follow = User.query.options(joinedload(User.following)).get(id)
    
    currentUser = current_user.to_dict()
    user = User.query.options(joinedload(User.following)).get(currentUser.id)
    following = [followingUser.to_dict() for followingUser in user.following]
    user.following.append(user_to_follow.to_dict())
    
    db.session.commit()
    user = User.query.options(joinedload(User.following)).get(currentUser.id)
    following = [followingUser.to_dict() for followingUser in user.following]
    followers = User.query.filter(User.following.any(id=id)).all()

    return {**user.to_dict(), "following": following, "followers": [follower.to_dict() for follower in followers]}