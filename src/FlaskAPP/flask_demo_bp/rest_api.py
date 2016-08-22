#!/usr/bin/env python3
# coding:utf-8

from flask_restful import Resource
from FlaskAPP.configs import rest_api


class PostApi(Resource):

    def get(self, post_id=None):

        return {'hello': 'world'}


urls = {
    PostApi: ('/api/post', '/api/post/<int:post_id>'),
}


for view_cls, url_tuple in urls.items():
    rest_api.add_resource(view_cls, *url_tuple, endpoint='api')
