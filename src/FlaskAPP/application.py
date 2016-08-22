#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-

import ipdb
from flask import Flask

from FlaskAPP import configs
from FlaskAPP.configs import lm
from FlaskAPP.configs import db, cache, redis, migrate, rest_api


__all__ = ['create_app']
DEFAULT_APP_NAME = 'FlaskAPP'


def create_app(config=None, app_name=None):
    if app_name is None:
        app_name = DEFAULT_APP_NAME
    app = Flask(app_name)
    configure_app(app, config)
    return app


def configure_app(app, config):
    app.config.from_object(configs.DefaultConfig())

    if config is not None:
        app.config.from_object(configs.config[config])

    app.config.from_envvar('RCAT_CONFIG', silent=True)
    configure_cache(app)
    configure_redis(app)
    configure_db(app)
    configure_logger(app)
    configure_blueprints(app)
    configure_loginmanager(app)
    configure_template_filter(app)
    configure_migrate(app)
    configure_rest(app)


def configure_redis(app):
    redis.init_app(app)


def configure_cache(app):
    cache.init_app(app)


def configure_db(app):
    db.init_app(app)


def configure_migrate(app):
    migrate.init_app(app, db)


def configure_logger(app):
    from FlaskAPP.configs import config_logger
    config_logger(app)


def configure_blueprints(app):
    from FlaskAPP import flask_demo_bp
    REGISTER_BLUEPRINTS = (
        (flask_demo_bp.instance, ''),
    )
    for blue, url_prefix in REGISTER_BLUEPRINTS:
        app.register_blueprint(blue, url_prefix=url_prefix)


def configure_template_filter(app):
    pass


def configure_rest(app):
    rest_api.init_app(app)


def configure_loginmanager(app):
    lm.init_app(app)
    lm.blueprint_login_views = {
        'flask_demo_bp': 'flask_demo_bp.login',
    }


@lm.user_loader
def load_user(user_uuid):
    pass
