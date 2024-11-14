# -*- coding: uft-8 -*-
{
    'name': 'Owl Tutorial',
    'version': '1.0',
    'license': 'LGPL-3',
    'summary': 'OWL Tutorial - Custom Sales Order Dashboard',
    'sequence': -1,
    'description': """OWL Tutorial - Custom Sales Order Dashboard""",
    'category': 'OWL',
    'depends': ['base', 'web', 'sale', 'board'],
    'data': [
        'security/ir.model.access.csv',
        'views/todo_list.xml',
        'views/res_partner.xml',
        'views/odoo_services.xml',
        'views/sales_dashboard.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'owl/static/src/components/**/*.js',
            'owl/static/src/components/**/*.xml',
            'owl/static/src/components/**/*.css',
            'owl/static/src/components/**/*.scss',
        ],
        'web.assets_frontend': [],
    },
}