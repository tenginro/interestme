from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired
from app.models import board

class BoardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    secret = BooleanField('secret')
    description = StringField('description')
    submit = SubmitField('Create Board')