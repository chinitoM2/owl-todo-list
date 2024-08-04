# -*- coding: utf-8 -*-
from odoo import api, fields, models


class OwlTodo(models.Model):
    _name = 'owl.todo.list'
    _description = 'OWL Todo List App - Action & Service'

    name = fields.Char(string='Task Name')
    completed = fields.Boolean()
    color = fields.Char()
