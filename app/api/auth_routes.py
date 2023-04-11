from flask import Blueprint, jsonify, session, request
from ..models import User, db
from ..forms import LoginForm
from ..forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload, subqueryload


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        id = current_user.to_dict().id
        this_user=User.query.get(id)
        following = [followingUser.to_dict() for followingUser in this_user.following]
        
        allUsers = User.query.all()
        followers = [user for user in allUsers if this_user in user.following]

        return {**this_user.to_dict(), "following": following, "followers": [follower.to_dict() for follower in followers]}
        # return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
    
        following = [followingUser.to_dict() for followingUser in user.following]
        
        followers = User.query.filter(User.following.any(id=user.id)).all()
        
        return {**user.to_dict(), "following": following, "followers": [follower.to_dict() for follower in followers]}
    
        # return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_pic=form.data['profile_pic'],
            about=form.data['about'],
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        
        following = [followingUser.to_dict() for followingUser in user.following]
        
        followers = User.query.filter(User.following.any(id=user.id)).all()
        
        return {**user.to_dict(), "following": following, "followers": [follower.to_dict() for follower in followers]}
        # return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401