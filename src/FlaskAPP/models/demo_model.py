#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-

import json
import time
import random
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from sqlalchemy import UniqueConstraint
from FlaskAPP.configs import db, logger


class DemoModel(db.Model):
    __tablename__ = 'flask_demo'

    id = db.Column(db.BIGINT, primary_key=True)
    demo = db.Column(db.String(20), unique=True)
    dt_create = db.Column(db.DateTime, default=datetime.now)
    dt_update = db.Column(db.DateTime, default=datetime.now)

