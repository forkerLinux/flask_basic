# -*- coding: utf-8 -*-

import warnings

from flask import url_for
from flask_script import Manager, prompt_bool, Shell
from flask_script import Server
from flask_migrate import MigrateCommand
from flask.exthook import ExtDeprecationWarning

from RcatAPP import create_app
from RcatAPP.configs import db


app = create_app
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


@manager.command
def list_routes():
    from urllib.parse import unquote
    output = []
    for rule in app().url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        line = unquote("{:50s} {:20s} {}".format(rule.endpoint,
                                                 methods, url))
        output.append(line)

    for line in sorted(output):
        print(line)


def _make_context():
    return dict(app=app, db=db)


manager.add_command('shell', Shell(make_context=_make_context))
manager.add_command('runserver', Server('0.0.0.0', port='5000'))


if __name__ == '__main__':
    warnings.simplefilter('ignore', ExtDeprecationWarning)
    manager.run()
