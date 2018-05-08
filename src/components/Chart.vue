<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <line-chart></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  name: 'Chart',
  data () {
    return {
      msg: 'This is the Chart View Component'
    }
  },
  components: {
    LineChart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  /*margin: 0 10px;*/
}
a {
  color: #42b983;
}
</style>
