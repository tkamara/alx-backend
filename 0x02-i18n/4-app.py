#!/usr/bin/env python3
"""i18n"""
from flask import Flask
from flask import render_template
from typing import Any
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config:
    """configuration variable"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale() -> Any:
    """determine best match language"""
    requested = request.args.get("locale")
    if requested in app.config['LANGUAGES']:
        return requested
    else:
        return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def hello_world() -> Any:
    """printing hello world"""
    return render_template("4-index.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0')
