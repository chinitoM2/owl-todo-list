/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState } = owl;

export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
        taskList:[
            {id:1, name:"Task 1", color:"#e6a200", completed: true},
            {id:2, name:"Task 2", color:"#0c234f", completed: true},
            {id:3, name:"Task 3", color:"#226077", completed: false},
            {id:4, name:"Task 4", color:"#54d8a7", completed: true},
            {id:5, name:"Task 5", color:"#addfba", completed: true},
            {id:6, name:"Task 6", color:"#f7ecc5", completed: false},
            {id:7, name:"Task 7", color:"#f4e4b5", completed: true},
            {id:8, name:"Task 8", color:"#e8d9b0", completed: true},
            {id:9, name:"Task 9", color:"#e0c8a6", completed: false},
            {id:10, name:"Task 10", color:"#d9b288", completed: true},
        ]
        })
    }
}

OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList)