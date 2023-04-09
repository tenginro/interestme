from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import pin

class PinForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    category_id = SelectField("category", choices=[(1, "Food"), (2, "Tech"), (3, "Art")])
    url = StringField("url")