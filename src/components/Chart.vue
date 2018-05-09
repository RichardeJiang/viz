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
      <!--line-chart :dataInput="data" v-if="type == 'line'"></line-chart>
      <bar-chart :dataInput="data" v-else-if="type == 'bar'"></bar-chart-->
      <bar-chart :dataInput="author"></bar-chart>
      <hori-bar-chart :dataInput="country"></hori-bar-chart>
      <hori-bar-chart :dataInput="affiliation"></hori-bar-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import HoriBarChart from '@/components/HoriBarChart'

export default {
  name: 'Chart',
  props: ['chartData'],
  data: function () {
    var topAuthors = this.chartData.topAuthors;
    var topCountries = this.chartData.topCountries;
    var topAffiliations = this.chartData.topAffiliations;

    var topAuthorData = {
      labels: topAuthors.labels,
      datasets: [
        {
          label: 'Top Authors',
          backgroundColor: 'rgba(47, 152, 208, 0.2)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          data: topAuthors.data,
        }
      ]
    }

    // topAuthorData.datasets[0].borderWidth = 5;

    var topCountryData = {
      labels: topCountries.labels,
      datasets: [
        {
          label: 'Top Countries',
          backgroundColor: 'rgba(47, 152, 208, 0.2)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          data: topCountries.data,
        }
      ]
    }

    var topAffiliationData = {
      labels: topAffiliations.labels,
      datasets: [
        {
          label: 'Top Affiliations',
          backgroundColor: 'rgba(47, 152, 208, 0.2)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          data: topAffiliations.data,
        }
      ]
    }

    return {
      msg: 'Chart View Component',
      author: topAuthorData,
      country: topCountryData,
      affiliation: topAffiliationData,
      options: [
        {
          value: 'line',
          label: 'Line Chart'
        }, {
          value: 'bar',
          label: 'Bar Chart'
        }
      ],
      type: 'bar'
    }
    
    /* Below: dummy data input */
    // var yearInfo = this.chartData.year;
    // var inCitations = this.chartData.inCitations;
    // var outCitations = this.chartData.outCitations;

    // var dataInput = {
    //   labels: yearInfo,
    //   datasets: [
    //     {
    //       label: 'inCitations',
    //       backgroundColor: 'rgba(47, 152, 208, 0.2)',
    //       pointBackgroundColor: 'white',
    //       borderWidth: 1,
    //       pointBorderColor: '#249EBF',
    //       data: inCitations,
    //     },
    //     {
    //       label: 'outCitations',
    //       backgroundColor: 'rgba(133, 23, 20, 0.2)',
    //       pointBackgroundColor: 'white',
    //       borderWidth: 1,
    //       pointBorderColor: '#783FCC',
    //       data: outCitations,
    //     }
    //   ]
    // }

    // return {
    //   msg: 'Chart View Component',
    //   data: dataInput,
    //   options: [
    //     {
    //       value: 'line',
    //       label: 'Line Chart'
    //     }, {
    //       value: 'bar',
    //       label: 'Bar Chart'
    //     }
    //   ],
    //   type: 'bar'
    // }

  },
  components: {
    LineChart,
    BarChart,
    HoriBarChart
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
