from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from ..models import User, db
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
    followers = [user.to_dict() for user in allUsers if this_user in user.following]

    # return {**this_user.to_dict(), 
    #         "pins":[pin.to_dict() for pin in this_user.pins], 
    #         "boards":[{**board.to_dict(), "Pins":[pin.to_dict() for pin in board.pins]} for board in this_user.boards],
    #         "saved_pins":[{**pin.to_dict(), "boards":[board.to_dict() for board in pin.boards]} for pin in this_user.saved_pins],  
    #         "following": following, 
    #         "followers": followers}
    return {**this_user.to_dict(), 
            "pins":[{**pin.to_dict(), "user_saved":[user.to_dict() for user in pin.user_saved]} for pin in this_user.pins], 
            "boards":[{**board.to_dict(), "Pins":[pin.to_dict() for pin in board.pins]} for board in this_user.boards],
            "saved_pins":[{**pin.to_dict(), "boards":[board.to_dict() for board in pin.boards]} for pin in this_user.saved_pins],  
            "following": following, 
            "followers": followers}




# please note the int:id here is other user's id
@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def following(id):
    user_to_follow = User.query.get(id)
    
    # currentUser is the user logged in
    currentUser = current_user
    curr_user = User.query.get(currentUser.id)
    
    if user_to_follow not in curr_user.following:
        curr_user.following.append(user_to_follow)
        db.session.commit()
        
    
    currUser = User.query.get(currentUser.id)
    following = [followingUser.to_dict() for followingUser in currUser.following]
    allUsers = User.query.all()
    followers = [user.to_dict() for user in allUsers if currUser in user.following]
    
    # will return the current user's info
    return {**currUser.to_dict(), 
            "pins":[pin.to_dict() for pin in currUser.pins], 
            "boards":[{**board.to_dict(), "Pins":[pin.to_dict() for pin in board.pins]} for board in currUser.boards],
            "saved_pins":[pin.to_dict() for pin in currUser.saved_pins], 
            "following": following, 
            "followers": followers}

# please note the int:id here is other user's id
@user_routes.route('/<int:id>/follow', methods=["DELETE"])
@login_required
def unfollow(id):
    user_to_unfollow = User.query.get(id)
    
    # currentUser is the user logged in
    currentUser = current_user
    curr_user = User.query.get(currentUser.id)
    
    curr_user.following=[user for user in curr_user.following if user.id != user_to_unfollow.id]
    
    db.session.commit()
    
    currUser = User.query.get(currentUser.id)
    following = [followingUser.to_dict() for followingUser in currUser.following]
    allUsers = User.query.all()
    followers = [user.to_dict() for user in allUsers if currUser in user.following]
    
    # will return the current user's info
    return {**currUser.to_dict(), 
            "pins":[pin.to_dict() for pin in currUser.pins], 
            "boards":[{**board.to_dict(), "Pins":[pin.to_dict() for pin in board.pins]} for board in currUser.boards],
            "saved_pins":[pin.to_dict() for pin in currUser.saved_pins], 
            "following": following, 
            "followers": followers}