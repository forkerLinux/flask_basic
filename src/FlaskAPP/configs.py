#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-
import warnings
import datetime

from flask.exthook import ExtDeprecationWarning
from flask_sqlalchemy import SQLAlchemy
from flask_redis import FlaskRedis as fRedis
from flask_cache import Cache
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_restful import Api

from celery import Celery
from celery.schedules import crontab

db = SQLAlchemy()
redis = fRedis()
cache = Cache()
lm = LoginManager()
logger = None
migrate = Migrate()
rest_api = Api()
celery = Celery()
warnings.simplefilter('ignore', ExtDeprecationWarning)


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

    # Celery
    CELERY_BROKER_URL = 'amqp://guest:guest@localhost:5672//'
    CELERY_BACKEND_URL = 'amqp://guest:guest@localhost:5672//'

	# CELERY_BROKER_URL = 'redis://localhost:6379/2'
	# CELERY_BACKEND_URL = 'redis://localhost:6379/2'

	# Cron
    CELERYBEAT_SCHEDULE = {
        'log-every-30-seconds': {
            'task': 'FlaskAPP.tasks.demo_task.log',
            'schedule': crontab(hour=0, minute=0),
            'args': ("Message", )
        }
    }

class TestConfig(object):
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TIMEZONE = 'Asia/Shanghai'
    CELERY_ENABLE_UTC = True


class ProductConfig(object):
    pass

config = {
    'default': DefaultConfig,
    'test': TestConfig,
    'product': ProductConfig,
}

def config_logger(app):
    global logger
    from FlaskAPP.utils.log_util import init_log
    logger = init_log(debug=app.config.get('DEBUG', True))
