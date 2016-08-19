#! /usr/bin/env python3.4
# -*- coding: utf-8 -*-

import string
import random
def random_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))
