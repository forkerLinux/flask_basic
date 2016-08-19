#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-

from flask import Blueprint
instance = Blueprint('flask_demo_bp', __name__)


@instance.app_errorhandler(404)
def handle_404(err):
    pass


@instance.app_errorhandler(500)
def handle_500(err):
    pass

from . import system_view
from . import rest_api
