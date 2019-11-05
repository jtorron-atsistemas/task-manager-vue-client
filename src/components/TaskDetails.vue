<template>
    <div id="taskDetails">
        <div class="mainDiv">
            <h3>Task details</h3>
            <p>Name: {{task.name}}</p>
            <p class="text-muted">Due date:{{task.due_date}}</p>
            <p><b>Description:</b></p>
            <p class="descriptionBox">
                {{task.description}}
            </p>
        </div>
        <go-back></go-back>
    </div>
</template>

<script>
    import GoBack from "@/components/GoBack";
    import { APIService } from '../apiservice,js';

    const apiService = new APIService();

    export default {
        name: "TaskDetails",
        components: { GoBack },
        data() {
            return {
                task: {name: 'Loading', description: 'Loading', due_date: 'Loading'},
                taskId: this.$route.params.id
            }
        },
        methods: {
            getTaskDetails: function() {
                apiService.getTask(this.taskId).then(data => {
                    this.task = data;
                }).catch(error => {
                    alert("Error getting task detail: " + JSON.stringify(error));
                });
            }
        },
        mounted() {
            this.getTaskDetails();
        }
    }
</script>

<style>
    .mainDiv {
        background: rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.2em;
        padding: 0.8em 0.5em;
    }
    .descriptionBox {
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.2em;
        padding: 0.8em 0.5em;
    }
</style>