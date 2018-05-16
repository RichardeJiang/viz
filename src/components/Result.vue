<template>
  <div class="hello">
    <div id="header" v-if="infoType === 'dummy'">
      <el-select v-model="type" placeholder="Select" style="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <h1>{{ msg }}</h1>
    <div v-if="infoType === 'author'">
      <bar-chart :dataInput="author" :titleText="'Top Authors'" class="chart"></bar-chart>
      <editable-text v-bind:text.sync="authorText"></editable-text>
      <!--el-select v-model="type" placeholder="Select Chart" style="margin-top: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <hori-bar-chart :dataInput="country" :titleText="'Top Countries'" class="chart" v-if="type=='bar'"></hori-bar-chart>
      <pie-chart :dataInput="country" :titleText="'Top Countries'" class="chart" v-else-if="type=='pie'"></pie-chart>
      <editable-text v-bind:text.sync="countryText"></editable-text>
      <el-select v-model="type" placeholder="Select Chart" style="margin-top: 20px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <hori-bar-chart :dataInput="affiliation" :titleText="'Top Affiliations'" class="chart"></hori-bar-chart>
      <editable-text v-bind:text.sync="remarks"></editable-text-->

      <div v-for="dataEntry in dataEntries">
        <el-select v-model="dataEntry.type" placeholder="Select Chart" style="margin-top: 20px">
          <el-option
            v-for="item in dataEntry.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <hori-bar-chart :dataInput="dataEntry.data" :titleText="'Top Countries'" class="chart" v-if="dataEntry.type=='bar'"></hori-bar-chart>
        <pie-chart :dataInput="dataEntry.data" :titleText="'Top Countries'" class="chart" v-else-if="dataEntry.type=='pie'"></pie-chart>
        <editable-text v-bind:text.sync="dataEntry.text"></editable-text>
      </div>
    </div>
    <div v-else-if="infoType === 'submission'">
    </div>
    <div v-else-if="infoType === 'review'">
    </div>
    <div v-else-if="infoType === 'dummy'"> <!--Unknown file, so http returned the dummy data-->
      <line-chart :dataInput="data" v-if="type == 'line'"></line-chart>
      <bar-chart :dataInput="data" v-else-if="type == 'bar'"></bar-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import HoriBarChart from '@/components/HoriBarChart'
import PieChart from '@/components/PieChart'

import EditableText from '@/components/EditableText'

import Const from './const'

export default {
  name: 'Chart',
  props: ['chartData', 'infoType'],
  data: function () {
    if (this.infoType == 'author') { // author.csv input
      var topAuthors = this.chartData.topAuthors;
      var topCountries = this.chartData.topCountries;
      var topAffiliations = this.chartData.topAffiliations;

      var topAuthorData = {
        labels: topAuthors.labels,
        datasets: [
          {
            label: 'Submission Counts',
            backgroundColor: 'rgba(47, 152, 208, 0.2)',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: topAuthors.data,
          }
        ]
      }

      var authorInitialText = "So it's rather clear that the one with the largest number of submissions this year is: " + topAuthors.labels[0] + ", and all the top " + String(topAuthors.labels.length) + ", putting together, contribute " + String(topAuthors.data.reduce(function(a, b) {return a + b;})) + " submissions in total.";

      var topCountryData = {
        labels: topCountries.labels,
        datasets: [
          {
            label: 'Submission Counts',
            backgroundColor: Const.colorScheme,
            // backgroundColor: ['rgba(231, 76, 60, 0.4)', 'rgba(211, 84, 0, 0.4)', 'rgba(241, 196, 15, 0.4)', 'rgba(26, 188, 156, 0.4)', 'rgba(52, 152, 219, 0.4)', ],
            pointBackgroundColor: 'white',
            borderWidth: 1,
            // pointBorderColor: '#249EBF',
            data: topCountries.data,
          }
        ]
      }

      var countryInitialText = "And from the country information (generated from the author data), we can see that the top 1 country, in this case " + topCountries.labels[0] + ", has made " + String(((topCountries.data[0] - topCountries.data[1]) / topCountries.data[1] * 100).toFixed(2)) + "% more submission than the second-placed " + topCountries.labels[1] + ".";

      var topAffiliationData = {
        labels: topAffiliations.labels,
        datasets: [
          {
            label: 'Submission Counts',
            backgroundColor: Const.colorScheme,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: topAffiliations.data,
          }
        ]
      }

      return {
        msg: 'Chart View Component',
        text: {
          val: 'This is update of input!!',
          edit: false
        },
        author: topAuthorData,
        dataEntries: [
          {
            data: topCountryData,
            text: {
              val: countryInitialText,
              edit: false
            },
            options: [
              {
                value: 'pie',
                label: 'Pie Chart'
              }, {
                value: 'bar',
                label: 'Bar Chart'
              }
            ],
            type: 'bar'
          },
          {
            data: topAffiliationData,
            text: {
              val: 'You may add in any additional remarks here.',
              edit: false
            },
            options: [
              {
                value: 'pie',
                label: 'Pie Chart'
              }, {
                value: 'bar',
                label: 'Bar Chart'
              }
            ],
            type: 'pie'
          }
        ],
        // country: topCountryData,
        // affiliation: topAffiliationData,
        authorText: {
          val: authorInitialText,
          edit: false
        },
        // countryText: {
        //   val: countryInitialText,
        //   edit: false
        // },
        // remarks: {
        //   val: 'You may add in any additional remarks here.',
        //   edit: false
        // },
        // options: [
        //   {
        //     value: 'pie',
        //     label: 'Pie Chart'
        //   }, {
        //     value: 'bar',
        //     label: 'Bar Chart'
        //   }
        // ],
        // type: 'bar'
      }
    } else if (this.infoType == 'reviewScore') {
      return {
        msg: 'Statistics View Component',
        yesPercentage: this.chartData.yesPercentage.toFixed(2),
        meanScore: this.chartData.meanScore,
        meanConfidence: this.chartData.meanConfidence,
        totalReview: this.chartData.totalReview,
        tableData: [
          {
            field: 'Mean Score',
            value: this.chartData.meanScore.toFixed(2)
          }, {
            field: 'Mean Confidence',
            value: this.chartData.meanConfidence.toFixed(2)
          }
        ],
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

    } else { // dummy data input
      var yearInfo = this.chartData.year;
      var inCitations = this.chartData.inCitations;
      var outCitations = this.chartData.outCitations;

      var dataInput = {
        labels: yearInfo,
        datasets: [
          {
            label: 'inCitations',
            backgroundColor: 'rgba(47, 152, 208, 0.2)',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: inCitations,
          },
          {
            label: 'outCitations',
            backgroundColor: 'rgba(133, 23, 20, 0.2)',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#783FCC',
            data: outCitations,
          }
        ]
      }

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
        type: 'bar'
      }
    }

  },
  methods: {
  },
  components: {
    LineChart,
    BarChart,
    HoriBarChart,
    PieChart,
    EditableText
  },
  beforeRouteUpdate(to, from, next) {
    console.log("inside haha");

    next();
  },
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
