from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = EmailField('email', validators=[DataRequired(), user_exists, Email(message="Please provide a valid email.")])
    password = PasswordField('password', validators=[DataRequired(), Length(min=6, message="Password must be more than 5 characters.")])
    first_name=StringField('first_name', validators=[DataRequired()])
    last_name=StringField('last_name', validators=[DataRequired()])
    profile_pic=StringField('profile_pic')
    about=StringField('about')