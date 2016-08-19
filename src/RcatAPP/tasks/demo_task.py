#!/usr/bin/env python3
# coding:utf-8

from RcatAPP.configs import celery


@celery.task()
def log(msg):
    return msg
