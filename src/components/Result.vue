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

      <bar-chart :data-input="topAuthorData" :title-text="'Top Authors'" class="chart"></bar-chart>
      <editable-text v-bind:text.sync="authorText"></editable-text>

      <el-select v-model="countryChartType" placeholder="Select Chart" style="margin-top: 20px;margin-right: 10px">
        <el-option
          v-for="item in chartOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="countryDataLength" placeholder="Select Length" style="margin-top: 20px;margin-right: 10px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!--hori-bar-chart :dataInput="computeCountryData()" :titleText="'Top Countries'" class="chart" v-if="countryChartType=='bar'"></hori-bar-chart-->
      <hori-bar-chart v-bind:data-input="topCountryData" :title-text="'Top Countries'" class="chart" v-if="countryChartType=='bar'"></hori-bar-chart>
      <pie-chart v-bind:data-input="topCountryData" :title-text="'Top Countries'" class="chart" v-else-if="countryChartType=='pie'"></pie-chart>
      <editable-text v-bind:text.sync="countryText"></editable-text>

      <el-select v-model="affiliationChartType" placeholder="Select Chart" style="margin-top: 20px; margin-right: 10px">
        <el-option
          v-for="item in chartOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="affiliationDataLength" placeholder="Select Length" style="margin-top: 20px;margin-right: 10px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <hori-bar-chart :data-input="topAffiliationData" :title-text="'Top Affiliations'" class="chart" v-if="affiliationChartType=='bar'"></hori-bar-chart>
      <pie-chart :data-input="topAffiliationData" :title-text="'Top Affiliations'" class="chart" v-else-if="affiliationChartType=='pie'"></pie-chart>
      <editable-text v-bind:text.sync="affiliationText"></editable-text>

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

      var authorInitialText = "So it's rather clear that the one with the largest number of submissions this year is: " + this.chartData.topAuthors.labels[0] + ", and all the top " + String(this.authorDataLength) + ", putting together, contribute " + String(this.chartData.topAuthors.data.slice(0, this.authorDataLength).reduce(function(a, b) {return a + b;})) + " submissions in total.";

      var countryInitialText = "And from the country information (generated from the author data), we can see that the top 1 country, in this case " + this.chartData.topCountries.labels[0] + ", has made " + String(((this.chartData.topCountries.data[0] - this.chartData.topCountries.data[1]) / this.chartData.topCountries.data[1] * 100).toFixed(2)) + "% more submission than the second-placed " + this.chartData.topCountries.labels[1] + ".";

      return {
        msg: 'Chart View Component',
        authorText: {
          val: authorInitialText,
          edit: false
        },
        countryText: {
          val: countryInitialText,
          edit: false
        },
        affiliationText: {
          val: "You may add in any additional remarks here.",
          edit: false
        },
        topAuthors: this.chartData.topAuthors,
        topCountries: this.chartData.topCountries,
        topAffiliations: this.chartData.topAffiliations,
        chartOptions: [
          {
            value: 'pie',
            label: 'Pie Chart'
          }, {
            value: 'bar',
            label: 'Bar Chart'
          }
        ],
        countryChartType: 'pie',
        affiliationChartType: 'bar',
        dataLengthOptions: [
          {
            value: 3,
            label: '3'
          }, {
            value: 5,
            label: '5'
          }, {
            value: 10,
            label: '10'
          }
        ],
        authorDataLength: 3,
        countryDataLength: 3,
        affiliationDataLength: 3,
        authorChartIncluded: true,
        countryChartIncluded: true,
        affiliationChartIncluded: true,
        topAuthorData: this.computeAuthorData(3),
        topCountryData: this.computeCountryData(3),
        topAffiliationData: this.computeAffiliationData(3),
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
    chooseColorScheme: function(len) {
      switch (len) {
        case 3:
          return Const.colorScheme3;
        case 5:
          return Const.colorScheme5;
        default:
          return Const.colorScheme10;
      }
    },
    computeAuthorData: function(len) {
      // var len = this.authorDataLength;
      var scheme = this.chooseColorScheme(len);
      var topAuthorData = {
        labels: this.chartData.topAuthors.labels.slice(0, len),
        datasets: [
          {
            label: 'Submission Counts',
            backgroundColor: scheme,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.chartData.topAuthors.data.slice(0, len),
          }
        ]
      }
      return topAuthorData;
    },
    computeCountryData: function(len) {
      // var len = this.countryDataLength;
      var scheme = this.chooseColorScheme(len);
      var topCountryData = {
        labels: this.chartData.topCountries.labels.slice(0, len),
        datasets: [
          {
            label: 'Submission Counts',
            backgroundColor: scheme,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.chartData.topCountries.data.slice(0, len),
          }
        ]
      }
      return topCountryData;
    },
    computeAffiliationData: function(len) {
      // var len = this.affiliationDataLength;
      var scheme = this.chooseColorScheme(len);
      var topAffiliationData = {
        labels: this.chartData.topAffiliations.labels.slice(0, len),
        datasets: [
          {
            label: 'Submission Counts',
            backgroundColor: scheme,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: this.chartData.topAffiliations.data.slice(0, len),
          }
        ]
      }
      return topAffiliationData;
    }
  },
  watch: {
    authorDataLength: function(newValue, oldValue) {
      var len = newValue;
      var authorInitialText = "So it's rather clear that the one with the largest number of submissions this year is: " + this.topAuthors.labels[0] + ", and all the top " + String(len) + ", putting together, contribute " + String(this.topAuthors.data.slice(0, len).reduce(function(a, b) {return a + b;})) + " submissions in total.";
      this.authorText = {
        val: authorInitialText,
        edit: false
      }
      this.topAuthorData = this.computeAuthorData(len);
    },
    countryDataLength: function(newValue, oldValue) {
      var len = newValue;
      var countryInitialText = "And from the country information (generated from the author data), we can see that the top 1 country, in this case " + this.topCountries.labels[0] + ", has made " + String(((this.topCountries.data[0] - this.topCountries.data[1]) / this.topCountries.data[1] * 100).toFixed(2)) + "% more submission than the second-placed " + this.topCountries.labels[1] + ".";
      this.countryText = {
        val: countryInitialText,
        edit: false
      }
      console.log("Inside the data length trigger!");
      this.topCountryData = this.computeCountryData(len);
    },
    affiliationDataLength: function(newValue, oldValue) {
      var len = newValue;
      var affiliationInitialText = "You may add in any additional remarks here.";
      this.affiliationText = {
        val: affiliationInitialText,
        edit: false
      }
      this.topAffiliationData = this.computeAffiliationData(len);
    }
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
