/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState, onWillStart } = owl;
import { useService } from "@web/core/utils/hooks";

export class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            task:{name:"", color:"#FF0000", completed:false},
            taskList:[],
            isEdit: false,
            activeId: false,
        })
        this.orm = useService("orm")
        this.model = "owl.todo.list"

        onWillStart(async ()=>{
            await this.getAllTasks()
        })
    }

    // helper function to automatically refresh task list data
    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model,[],["name", "color", "completed"])
    }

    addTask(){
        this.resetForm()
        this.state.activeId = false
        this.state.isEdit = false
    }

    editTask(task){
        this.state.activeId = task.id
        this.state.isEdit = true
        this.state.task = {name: task.name, color: task.color, completed: task.completed}
    }

    async saveTask(){
        if(!this.state.isEdit){
            await this.orm.create(this.model, [{name: this.state.task.name, color: this.state.task.color, completed: this.state.task.completed}])
        }
        else{
            await this.orm.write(this.model, [this.state.activeId], this.state.task)
        }

        await this.getAllTasks()
    }

    // helper function to reset task fields when user wants to add new task
    resetForm(){
        this.state.task = {name:"", color:"#FF0000", completed: false}
    }
}

OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList)




