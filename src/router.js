import Vue    from 'vue'
import Router from 'vue-router'

import ListTasks    from '@/components/ListTasks'
import TaskDetails  from '@/components/TaskDetails'
import NewTask      from "@/components/NewTask";
import EditTask from "@/components/EditTask";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homeRoute',
            component: ListTasks
        },
        {
            path: '/task/:id',
            name: 'taskDetailsRoute',
            component: TaskDetails
        },
        {
            path: '/edit-task/:id',
            name: 'taskEditionModeRoute',
            component: EditTask
        },
        {
            path: '/add-new',
            name: 'addNewTaskRoute',
            component: NewTask
        }
    ],
    linkActiveClass: "active",
    mode: "history"
})