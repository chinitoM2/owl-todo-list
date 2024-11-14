/** @odoo-module */

import { registry } from "@web/core/registry"
const { Component } = owl

export class OwlSalesDashboard extends Component {}

OwlSalesDashboard.template = "owl.SalesDashboard"

registry.category("actions").add("owl.sales_dashboard", OwlSalesDashboard)