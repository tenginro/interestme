from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import pin

class PinForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    category = SelectField("category", choices=["Food", "Tech", "Art"])
    url = StringField("url")
    submit = SubmitField("Create Pin")


