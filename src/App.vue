<template>
<center>
<div id="app" style="width:85%;">
  <el-container id="main">
    <el-aside style="width:30%;">
      <div>
        <img src="./assets/logo.png" style="vertical-align:middle;">
      </div>
      <router-link to="/">
          <el-button @click="startHacking" type="primary">Star</el-button>
        </router-link>
        <router-link to="/add">
          <el-button type="selection">End</el-button>
        </router-link>
        <router-link to="/ec">
          <el-button type="success">EC</el-button>
        </router-link>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <center>
          <router-view/>
        </center>
      </el-main>
    </el-container>
  </el-container>
  <div>
    <!--router-link :to="{ name: 'HelloWorld' }"-->
  </div>
</div>
</center>

</template>

<script>
export default {
  name: 'App',
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 2500
      })
    }
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

#main {
  margin-bottom: 20px;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin-bottom: 5px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 250px;
  margin-right: 5px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 450px;*/
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>