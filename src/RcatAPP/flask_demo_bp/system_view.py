#! /usr/bin/env python3.4
# -*- coding: utf-8

from flask.views import MethodView
from . import instance


# 首页
class IndexView(MethodView):

    def get(self):
        return 'index.html'

urls = {
    '/': (IndexView, ['GET', ]),  # 主页
}


for url, items in urls.items():
    if url != '/':
        instance.add_url_rule(
            url,
            view_func=items[0].as_view(url[1:]),
            methods=items[1],
        )
    else:
        instance.add_url_rule(
            '/',
            view_func=IndexView.as_view('index'),
            methods=items[1],
        )
