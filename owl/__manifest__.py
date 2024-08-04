# -*- coding: uft-8 -*-
{
    'name': 'Owl Tutorial',
    'version': '1.0',
    'summary': 'OWL Tutorial - Action and Service Todo List',
    'sequence': -1,
    'description': """OWL Tutorial - Action and Service Todo List""",
    'category': 'OWL',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/todo_list.xml'
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'owl/static/src/components/**/*.js',
            'owl/static/src/components/**/*.xml',
        ],
        'web.assets_frontend': [],
    },
}