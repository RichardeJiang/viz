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
      <p>
        So it's rather clear that the one with the largest number of submissions this year is: {{topAuthor}}, and all the top {{topAuthorNumber}}, putting together, contribute {{topAuthorContri}} submissions.
      </p>
      <hori-bar-chart :dataInput="country" class="chart"></hori-bar-chart>
      <p>
        And from the country information (generated from the author data), we can see that the top 1 country, in this case {{firstCountry}}, has made {{topCountryDiff}}% more submission than the second-placed {{secondCountry}}.
      </p>
      <hori-bar-chart :dataInput="affiliation" class="chart"></hori-bar-chart>
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
      type: 'bar',
      // Possible to consolidate the following info into one object and retrieve using the key
      topAuthor: topAuthors.labels[0],
      topAuthorContri: topAuthors.data.reduce(function(a, b) {return a + b;}),
      topAuthorNumber: topAuthors.labels.length,
      topCountryDiff: ((topCountries.data[0] - topCountries.data[1]) / topCountries.data[1] * 100).toFixed(2),
      firstCountry: topCountries.labels[0],
      secondCountry: topCountries.labels[1],
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
.chart {
  margin-bottom: 10px;
  margin-top: 10px;
}

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
