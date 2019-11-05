<template>
    <div class="backBar">
        <button class="btn btn-primary" v-on:click="goBackHistory()"><font-awesome-icon icon="chevron-left" /> Go back</button>
    </div>
</template>

<script>
    export default {
        name: "NewTask",
        components: {},
        methods: {
            goBackHistory() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    .backBar {
        margin-top: 0.5em;
    }
</style>
