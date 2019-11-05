<template>
    <div id="tasksList">
        <div class="text-align-right">
            <button class="btn btn-success" v-on:click="addNewTask()"><font-awesome-icon icon="plus" /> Add new</button>
        </div>
        <ul>
            <li v-for="task in tasks" v-bind:key="task.id">
                <div class="row">
                    <div class="col-12">
                        <b>{{task.name}}</b>
                    </div>
                    <div class="col-6">
                        <small>{{task.due_date}}</small>
                    </div>
                    <div class="col-6" style="text-align: right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button v-on:click="loadTaskDetails(task.id)" class="btn btn-primary btn-sm"><font-awesome-icon icon="search" /></button>
                            <button v-on:click="loadTaskEditionMode(task.id)" class="btn btn-warning btn-sm"><font-awesome-icon icon="pen" /></button>
                            <button v-on:click="deleteConfirmation(task.id)" class="btn btn-danger btn-sm"><font-awesome-icon icon="trash" /></button>
                            <b-modal :id="'delete-confirmation-'+task.id" hide-footer title="Delete confimation">
                                <div class="d-block text-center">
                                    <p class="my-4">¿Are you sure you wanna to delete this task?</p>
                                </div>
                                <b-button class="mt-3" variant="outline-primary" block @click="hideModal()">No</b-button>
                                <b-button class="mt-2" variant="outline-danger" block @click="deleteTask()">Yes</b-button>
                            </b-modal>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { APIService } from '../apiservice,js';

    const apiService = new APIService();

    export default {
        name: "ListTasks",
        components: {},
        data() {
            return {
                tasks: [],
                tasksCount:0,
                selectedTaskId: 0,
            }
        },
        methods: {
            getTasks() {
                apiService.getTasks().then((data) => {
                    this.tasks = data;
                    this.tasksCount= data;
                });
            },
            loadTaskDetails: function(id) {
                this.$router.push({name: 'taskDetailsRoute', params: { id: id }})
            },
            loadTaskEditionMode: function(id) {
                this.$router.push({name: 'taskEditionModeRoute', params: { id: id }})
            },
            addNewTask () {
                this.$router.push({ path: 'add-new' });
            },
            deleteTask() {
                apiService.deleteTask(this.selectedTaskId).then(data => {
                    if (data.data.operation == "ok") {
                        this.getTasks();
                    }
                }).catch(error => {
                    alert("Delete operation did fail: " + JSON.stringify(error));
                });

                this.$bvModal.hide("delete-confirmation-"+this.selectedTaskId);
            },
            deleteConfirmation(id) {
                this.selectedTaskId = id;
                this.$bvModal.show("delete-confirmation-"+id);
            },
            hideModal() {
                this.$bvModal.hide("delete-confirmation-"+this.selectedTaskId);
            }
        },
        mounted() {
            this.getTasks();
        }
    }
</script>

<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    ul li {
        text-align: left;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.2rem;
        margin: 8px 0;
        background: rgba(0, 0, 0, 0.05);
    }
    ul li:hover {
        background: rgba(0, 0, 0, 0.02);
    }
</style>