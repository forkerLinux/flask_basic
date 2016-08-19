#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-

from flask_sqlalchemy import SQLAlchemy
from flask_redis import FlaskRedis as fRedis
from flask_cache import Cache
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_restful import Api

db = SQLAlchemy()
redis = fRedis()
cache = Cache()
lm = LoginManager()
logger = None
migrate = Migrate()
rest_api = Api()


class DefaultConfig(object):
    DEBUG = True
    SALT_KEY = 'I am salt, I am tasty'
    SECRET_KEY = 'I am a secret, never tell others I am here'
    # cache configure
    CACHE_TYPE = 'redis'
    CACHE_REDIS_URL = 'redis://@localhost:6379/0'
    CACHE_DEFAULT_TIMEOUT = 60          # 1 minutes
    REDIS_URL = 'redis://@localhost:6379/1'

    # mysql config
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/rcat'
    # SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_POOL_SIZE = 20
    SQLALCHEMY_POOL_TIMEOUT = 10
    SQLALCHEMY_POOL_RECYCLE = 60
    SQLALCHEMY_MAX_OVERFLOW = 20


class TestConfig(object):
    pass


class ProductConfig(object):
    pass


def config_logger(app):
    global logger
    from RcatAPP.utils.log_util import init_log
    logger = init_log(debug=app.config.get('DEBUG', True))
