#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-

from flask import Blueprint, abort, render_template
instance = Blueprint('flask_demo_bp', __name__)


@instance.app_errorhandler(404)
def handle_404(err):
    return render_template('404.html')


@instance.app_errorhandler(500)
def handle_500(err):
    return render_template('500.html')

from . import system_view
from . import rest_api
