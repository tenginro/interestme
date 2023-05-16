from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import pin
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class PinForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    category = SelectField("category", choices=["Art","Food","Tech"])
    # url = StringField("url")
    url = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Pin")


