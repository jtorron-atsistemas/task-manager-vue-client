<template>
    <div>
        <div class="newForm">
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="task.name" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name">
                <small v-if="validation.name" id="nameHelp" class="form-text text-danger">Required.</small>
            </div>
            <div class="form-group">
                <label for="date">Due date</label>
                <input class="form-control" v-model="task.due_date"  id="date" aria-describedby="dateHelp" placeholder="Click to select date">
                <small v-if="validation.due_date" id="dateHelp" class="form-text text-danger">Required. Format Y-m-d.</small>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="task.description" class="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" rows="5">
                </textarea>
                <small v-if="validation.description" id="descriptionHelp" class="form-text text-danger">Required.</small>
            </div>
            <div>
                <p v-if="operationDidFail" class="form-text text-danger">Operation did fail. Try again in a few minutes.</p>
            </div>
            <div class="text-align-right">
                <button type="submit" :disabled="!saveButtonState.enabled" class="btn btn-success" v-on:click="updateTask()">
                    <font-awesome-icon icon="save" v-if="saveButtonState.icon == 'save'" />
                    <font-awesome-icon icon="spinner" v-if="saveButtonState.icon == 'spinner'" class="fa-spin" />
                    {{ saveButtonState.text }}
                </button>
            </div>
        </div>
        <go-back></go-back>
    </div>
</template>

<script>
    import GoBack from "@/components/GoBack";
    import { APIService } from '../apiservice,js';

    const apiService = new APIService();

    export default {
        name: "NewTask",
        components: { GoBack },
        data() {
            return {
                task: {name: 'Loading', description: 'Loading', due_date: 'Loading'},
                taskId: this.$route.params.id,
                validation: {name: null, description: null, due_date: null},
                operationDidFail: false,
                saveButtonState: {enabled: true, text: "Update", icon: "save"}
            }
        },
        methods: {
            setCurrentDate: function () {
                let now = new Date();
                const month = now.getMonth() >= 10 ? now.getMonth() : '0'+now.getMonth();
                const day = now.getDay() >= 10 ? now.getDay() : '0'+now.getDay();
                this.task.dueDate = now.getFullYear()+'-'+month+'-'+day;
            },
            getTaskDetails: function() {
                apiService.getTask(this.taskId).then(data => {
                    this.task = data;
                    this.task.due_date = this.task.due_date.substring(0, 10);
                }).catch(error => {
                    alert("Error getting task detail: " + JSON.stringify(error));
                });
            },
            setButtonState: function (sending) {
                if (sending) {
                    this.saveButtonState = {enabled: false, text: "Saving ...", icon: "spinner"};
                } else {
                    this.saveButtonState = {enabled: true, text: "Save", icon: "save"};
                }
            },
            updateTask: function() {
                this.operationDidFail = false;
                this.validation = {name: null, description: null, due_date: null};
                this.operationDidFail = false;
                this.setButtonState(true);
                let updatedTask = JSON.parse(JSON.stringify(this.task));
                updatedTask.due_date = updatedTask.due_date + ' 00:00:00';
                apiService.updateTask(this.taskId, updatedTask).then(data => {
                    if (data.data.operation == "ok") {
                        this.$router.push({name: 'homeRoute'})
                    } else if (data.data.operation == "fail") {
                        this.operationDidFail = true;
                    }
                }).catch(error => {
                    this.setButtonState(false);
                    if (error.response.data.error == "validation_errors") {
                        if (error.response.data.messages.name != undefined) {
                            this.validation.name = error.response.data.messages.name;
                        }
                        if (error.response.data.messages.due_date != undefined) {
                            this.validation.due_date = error.response.data.messages.name;
                        }
                        if (error.response.data.messages.description != undefined) {
                            this.validation.description = error.response.data.messages.name;
                        }
                    } else {
                        this.operationDidFail = true;
                    }
                });
            }
        },
        mounted() {
            this.setCurrentDate();
            this.getTaskDetails();
        }
    }
</script>

<style>
    .newForm {
        background: rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.2em;
        padding: 0.8em 0.5em;
    }
    .hasErrors {
        border-color: red;
    }
</style>