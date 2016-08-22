#!/usr/bin/env python3

class RetValError(Exception):

    def __init__(self, errcode, errmsg):
        self.errcode = errcode
        self.errmsg = errmsg

    def __str__(self):
        return repr('errcode:{errcode}, errmsg:{errmsg}' .format(errcode=self.errcode,errmsg=self.errmsg))


if __name__ == '__main__':
    try:
        raise RetValError(1, None)
    except Exception as e:
        print(e)
