/** @odoo-module */

import { registry } from "@web/core/registry"
import { EmailField } from "@web/views/fields/email/email_field"

class ValidEmailField extends EmailField {
    setup(){
        super.setup()
        console.log("Email Field Inherited in Form View of Contacts App")
        console.log(this.props)
    }

    get isValidEmail(){
        let reg_expr = /\S+@\S+\.\S+/;
        return reg_expr.test(this.props.value)
    }
}
ValidEmailField.template = "owl.ValidEmailField"
ValidEmailField.supportedTypes = ["char"]

registry.category("fields").add("valid_email", ValidEmailField)