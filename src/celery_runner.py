#!/usr/bin/env python3
# coding:utf-8

import os
from celery import Celery

from FlaskAPP import create_app
from FlaskAPP.tasks.demo_task import log


def make_celery(app):
    celery = Celery(
        app.import_name,
        broker = app.config['CELERY_BROKER_URL'],
        backend = app.config['CELERY_BACKEND_URL']
    )

    celery.conf.update(app.config)
    TaskBase = celery.Task

    class ContextTask(TaskBase):

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery

flask_app = create_app(os.getenv('FLASK_CONF') or 'default')

celery = make_celery(flask_app)
