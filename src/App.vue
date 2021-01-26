<template>
  <div id="app">    
     
      <h1 style="display:none">señales</h1>
      
    <router-view/>
  </div>
</template>
<script>




export default {
  name: 'App',
   components: {
    
  }
}

</script>
<!--<script src="./scripts/home.js"></script>-->
<style lang="less">
@color:red;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
