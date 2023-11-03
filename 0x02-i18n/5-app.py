#!/usr/bin/env python3
"""i18n"""
from flask import Flask
from flask import render_template
from typing import Any
from flask_babel import Babel
from typing import Union
from flask import g


app = Flask(__name__)
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """configuration variable"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


def get_user() -> Union[Dict, None]:
    """returns user dictionary"""
    user_id = request.args.get('login_as')
    if user_id:
        return users.get(int(user_id))
    return None


@app.before_request
def before_request() -> Any:
    """find a user if any"""
    g.user = get_user()


@babel.localeselector
def get_locale() -> Any:
    """determine best match language"""
    requested = request.args.get("locale")
    if requested in appi.config['LANGUAGES']:
        return requested
    else:
        return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def hello_world() -> Any:
    """printing hello world"""
    return render_template("5-index.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0')
