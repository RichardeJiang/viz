<template>
  <div class="hello">
    <div id="header">
      <el-select v-model="type" placeholder="Select" style="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <h1>{{ msg }}</h1>
    </div>
    <div>
      <line-chart :dataInput="data" v-if="type == 'line'"></line-chart>
      <bar-chart :dataInput="data" v-else-if="type == 'bar'"></bar-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'

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
          // backgroundColor: '#f87979',
          backgroundColor: 'rgba(47, 152, 208, 0.2)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          //Data to be represented on y-axis
          data: inCitations,
        },
        {
          label: 'outCitations',
          // backgroundColor: '#f13030',
          backgroundColor: 'rgba(133, 23, 20, 0.2)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#783FCC',
          data: outCitations,
        }
      ]
    }

    // var defaultChartData = {
    //   labels: [1,2,3,4,5],
    //   datasets: [
    //     {
    //       label: 'dummy',
    //       data: [10, 20, 30, 40, 50]
    //     }
    //   ]
    // }

    return {
      msg: 'Chart View Component',
      data: dataInput,
      options: [
        {
          value: 'line',
          label: 'Line Chart'
        }, {
          value: 'bar',
          label: 'Bar Chart'
        }
      ],
      type: 'line'
    }

  },
  components: {
    LineChart,
    BarChart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.line {
  float: left;
}
.center-line {
  float: center;
}
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
