/** @odoo-module */

import { registry } from "@web/core/registry"
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view"
import { useService } from "@web/core/utils/hooks"
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog"
import { routeToUrl } from "@web/core/browser/router_service"
import { browser } from "@web/core/browser/browser"

const { Component, useSubEnv, useState } = owl

export class OwlOdooServices extends Component{
    setup(){
        console.log("Odoo Services")
        this.display = {
            controlPanel: {"top-right": false, "bottom-right": false}
        }
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })

        this.cookieService = useService("cookie")
        if (this.cookieService.current.dark_mode == undefined){
            this.cookieService.setCookie("dark_mode", false)
        }

        const router = this.env.services.router

        this.state = useState({
            dark_mode: this.cookieService.current.dark_mode,
            get_http_data: [],
            post_http_data: [],
            rpc_data: [],
            orm_data: [],
            bg_success: router.current.search.bg_success,
            user_data: [],
            company_data: null,
        })

        const titleService = useService("title")
        titleService.setParts({zopenerp: "Odoo 16"})
    }

    // show notification
    shoheiNotification(){
        const notif = this.env.services.notification
        notif.add("Wed Oct 30 - notification test 1", {
            title: "Odoo Notification Service",
            type: "info",
            sticky: true,
            buttons: [
                {
                    name: "Notification Action",
                    onClick: ()=>{
                        console.log("Notification Action test")
                    },
                    primary: true,
                }
            ]
        })
    }

    // show dialog
    shoheiDialog(){
        const dialog = this.env.services.dialog
        dialog.add(ConfirmationDialog,
            {
                title: "Dialog Service",
                body: "This is Odoo's Dialog Service. Click OK button to confirm. Click CANCEL button or X close button to cancel.",
                confirm: ()=>{
                    console.log("Dialog Service Confirmed")
                },
                cancel: ()=>{
                    console.log("Dialog Service Cancelled")
                }
            },
            {
                onClose: ()=>{
                    console.log("Dialog Service Closed")
                }
            }
        )
    }

    // show rainbow main effect
    shoheiEffect(){
        const effect = this.env.services.effect
        effect.add({
            type: "rainbow_man",
            message: "Boom! Team record for the past 30 days. Currently, Odoo's only effect is the rainbow man"
        })
    }

    // set dark_mode cookie service
    bakeCookieService(){
        if (this.cookieService.current.dark_mode == 'false'){
            this.cookieService.setCookie("dark_mode", true)
        }
        else{
            this.cookieService.setCookie("dark_mode", false)
        }

        this.state.dark_mode = this.cookieService.current.dark_mode
    }

    async getHTTPService(){
        const http = this.env.services.http
        const data = await http.get('https://dummyjson.com/products')
        //console.log(data)
        this.state.get_http_data = data.products
    }

    async postHTTPService(){
        const http = this.env.services.http
        const data = await http.post('https://dummyjson.com/products/add', {title: 'Oolong Cream BlasTea',})
        this.state.post_http_data = data
        console.log(data)
    }

    async getRPCService(){
        const rpc = this.env.services.rpc
        const data = await rpc("/owl/rpc_service")
        this.state.rpc_data = data
    }

    async getORMService(){
        const orm = this.env.services.orm
        const data = await orm.searchRead("res.partner", [], ['name', 'email', 'phone','function'])
        data.forEach(record => {
            if (record.phone === false) {
                record.phone = 'phone # not provided'
            }

            if (record.function === false) {
                record.function = 'function role not provided'
            }
        });
        this.state.orm_data = data
    }

    getActionService(){
        const action = this.env.services.action
        action.doAction({
            type: "ir.actions.act_window",
            name: "Action Service",
            res_model: "res.partner",
            domain: [],
            context: {},
            views: [
                [false, "list"],
                [false, "form"],
            ],
            view_mode:"list,form",
            target: "current"
        })
    }

    getRouterService(){
        const router = this.env.services.router
        console.log(router)
        let { search } = router.current
        search.bg_success = search.bg_success == "1" ? "0" : "1"
        browser.location.href = browser.location.origin + routeToUrl(router.current)
    }

    getUserService(){
        const user = this.env.services.user
        this.state.user_data = user
    }

    getCompanyService(){
        const company = this.env.services.company
        this.state.company_data = JSON.stringify(company)
    }
}

OwlOdooServices.template = "owl.OdooServices"
OwlOdooServices.components = { Layout }

registry.category("actions").add("owl.OdooServices",OwlOdooServices)