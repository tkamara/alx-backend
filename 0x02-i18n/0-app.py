#!/usr/bin/env python3

from flask import Flask
from flask import render_template
from typing import Any


app = Flask(__name__)


@app.route('/')
def hello_world() -> Any:
    """printing hello world"""
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
