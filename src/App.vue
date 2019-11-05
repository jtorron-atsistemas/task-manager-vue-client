<template>
  <div>
    <h1><font-awesome-icon icon="list-alt" /> Task Manager App</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  body{
    padding: 3px;
  }
  .text-align-left {
    text-align: left;
  }
  .text-align-right {
    text-align: right;
  }


</style>
