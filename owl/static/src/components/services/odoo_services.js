/** @odoo-module */

import { registry } from "@web/core/registry"
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view"
import { useService } from "@web/core/utils/hooks"
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog"

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

        this.state = useState({
            dark_mode: this.cookieService.current.dark_mode,
            get_http_data: [],
            post_http_data: [],
            rpc_data: [],
        })
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
        console.log(data)
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
        console.log(data)
        this.state.rpc_data = data
    }
}

OwlOdooServices.template = "owl.OdooServices"
OwlOdooServices.components = { Layout }

registry.category("actions").add("owl.OdooServices",OwlOdooServices)