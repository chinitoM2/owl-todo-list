/** @odoo-module */

import { registry } from "@web/core/registry"
import { kanbanView } from "@web/views/kanban/kanban_view"
import { KanbanController } from "@web/views/kanban/kanban_controller"
import { useService } from "@web/core/utils/hooks"

const { onWillStart } = owl

class ResPartnerKanbanController extends KanbanController {
    setup(){
        super.setup()
        console.log("This is res partner kanban controller for contacts app")
        this.action = useService("action")
        this.orm = useService("orm")

        onWillStart(async ()=>{
            this.contact_locations = await this.orm.readGroup("res.partner", [], ['state_id'], ['state_id'])
            // MAP over contact locations where state_id is false and reassign to [444, 'Other]
            this.contact_locations = this.contact_locations.map(location => {
                if(location.state_id === false){
                    location.state_id = [444, 'Other'];
                }
                return location;
            });
            //this.contact_locations = this.contact_locations.filter(location => location.state_id !== false)
            console.log("contact locations: ", this.contact_locations)
        })
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

    // on-click function to add selected location to search bar for filtering
    selectLocations(state){
        const id = state[0]
        const name = state[1]

        this.env.searchModel.setDomainParts({
            state: {
                domain: [['state_id', '=', id]],
                facetLabel: name
            }
        })
    }
}

// Contact Location SIDEBAR in Kanban View of Contacts App
ResPartnerKanbanController.template = "owl.ResPartnerKanbanView"

export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: "owl.ResPartnerKanbanView.Buttons",
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanView)