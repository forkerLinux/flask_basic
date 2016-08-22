#!/usr/bin/env python3
# coding:utf-8

from FlaskAPP.configs import celery


@celery.task(serializer='json')
def log(msg):
    return msg
