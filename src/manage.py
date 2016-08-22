# -*- coding: utf-8 -*-

import os
import warnings

from flask import url_for
from flask_script import Manager, prompt_bool, Shell
from flask_script import Server
from flask_script.commands import ShowUrls, Clean
from flask_migrate import MigrateCommand
from flask.exthook import ExtDeprecationWarning

from FlaskAPP import create_app
from FlaskAPP.configs import db


app = create_app(os.getenv('FLASK_CONF') or 'default')
manager = Manager(app)

manager.add_command('db', MigrateCommand)


@manager.command
def initdb():
    if prompt_bool("Are you sure? You will init your database"):
        db.create_all()


@manager.command
def dropdb():
    if prompt_bool("Are you sure? You will lose all your data!"):
        db.drop_all()


@manager.command
def rdb():
    if prompt_bool("Are you sure? You will lose all your data!"):
        db.drop_all()
        db.create_all()

def _make_context():
    return dict(app=app, db=db)


manager.add_command('shell', Shell(make_context=_make_context))
manager.add_command('runserver', Server('0.0.0.0', port='5000'))
manager.add_command('show-urls', ShowUrls())
manager.add_command('clean', Clean())
warnings.simplefilter('ignore', ExtDeprecationWarning)

if __name__ == '__main__':
    manager.run()
