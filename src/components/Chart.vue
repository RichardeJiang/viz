<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <line-chart :dataInput="data"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  name: 'Chart',
  props: ['chartData'],
  data: function () {
    var yearInfo = this.chartData.year;
    var inCitations = this.chartData.inCitations;
    var outCitations = this.chartData.outCitations;

    var dataInput = {
      labels: yearInfo,
      datasets: [
        {
          label: 'inCitations',
          backgroundColor: '#f87979',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          //Data to be represented on y-axis
          data: inCitations,
        },
        {
          label: 'outCitations',
          backgroundColor: '#f13030',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#783FCC',
          data: outCitations,
        }
      ]
    }

    return {
      msg: 'This is the Chart View Component',
      data: dataInput
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
