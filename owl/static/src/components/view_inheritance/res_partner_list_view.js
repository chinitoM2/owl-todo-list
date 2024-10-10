/** @odoo-module */

import { registry } from "@web/core/registry"
import { listView } from "@web/views/list/list_view"
import { ListController } from "@web/views/list/list_controller"
import { useService } from "@web/core/utils/hooks"

class ResPartnerListController extends ListController {
    setup(){
        super.setup()
        console.log("this is the res partner controller for list view")
        this.action = useService("action")
    }

    showSaleOrders(){
        console.log("Show Sale Orders")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sale Orders",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]]
        })
    }

    showInvoices(){
        console.log("Show Invoices")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Invoices",
            res_model: "account.move",
            views: [[false, "list"], [false, "form"]]
        })
    }

    showMeetings(){
        console.log("Show Meetings")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Meetings",
            res_model: "calendar.event",
            views: [[false, "list"], [false, "form"]]
        })
    }
}

export const resPartnerListView = {
    ...listView,
    Controller: ResPartnerListController,
    buttonTemplate: "owl.ResPartnerListView.Buttons",
}

registry.category("views").add("res_partner_list_view", resPartnerListView)