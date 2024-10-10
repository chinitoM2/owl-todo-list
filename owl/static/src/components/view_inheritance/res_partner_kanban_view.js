/** @odoo-module */

import { registry } from "@web/core/registry"
import { kanbanView } from "@web/views/kanban/kanban_view"
import { KanbanController } from "@web/views/kanban/kanban_controller"
import { useService } from "@web/core/utils/hooks"

class ResPartnerKanbanController extends KanbanController {
    setup(){
        super.setup()
        console.log("This is res partner kanban controller for contacts app")
        this.action = useService("action")
    }

    showSaleOrders(){
        console.log("Show Sale Orders in Kanban View")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Sale Orders",
            res_model: "sale.order",
            views: [[false, "list"], [false, "form"]]
        })
    }

    showInvoices(){
        console.log("Show Invoices in Kanban View")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Invoices",
            res_model: "account.move",
            views: [[false, "list"], [false, "form"]]
        })
    }

    showMeetings(){
        console.log("Show Meetings in Kanban View")
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Meetings",
            res_model: "calendar.event",
            views: [[false, "list"], [false, "form"]]
        })
    }
}

export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: "owl.ResPartnerKanbanView.Buttons",
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView)