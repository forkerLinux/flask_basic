#! /usr/bin/env python3
# -*- coding: utf-8 -*-
# File: log_util.py
# Author: SivaCoHan
# Date: 2016-01-08

import sys
import logging


def init_log(log_file=None, debug=False):
    '''Initialize logging module.
    '''
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    fmt = ''' %(asctime)s [%(levelname)s] %(process)d %(message)s'''
    formatter = logging.Formatter(fmt)

    # Create a file handler to store error messages
    if log_file is not None:
        fhdr = logging.FileHandler(log_file, mode='w')
        fhdr.setLevel(logging.DEBUG)
        fhdr.setFormatter(formatter)
        logger.addHandler(fhdr)

    # Create a stream handler to print all messages to console
    if debug:
        chdr = logging.StreamHandler(sys.stdout)
        chdr.setLevel(logging.DEBUG)
        chdr.setFormatter(formatter)
        logger.addHandler(chdr)

    chdr_err = logging.StreamHandler(sys.stderr)
    chdr_err.setLevel(logging.ERROR)
    chdr_err.setFormatter(formatter)
    logger.addHandler(chdr_err)

    return logger
