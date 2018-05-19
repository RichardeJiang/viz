<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="infoType === 'author'"> <!--Start of Author Component-->

      <bar-chart :data-input="topAuthorData" :title-text="'Top Authors'" class="chart" id="testpdf" ref="testpdf"></bar-chart>
      <!--using text.sync for two-way data binding to editable text child component-->
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

      <el-button @click="saveToPdf" type="success" plain style="margin-top: 10px">Save</el-button>

    </div> <!--End of Author Component-->


    <div v-else-if="infoType === 'submission'"> <!--Start of Submission Component-->
      <time-line-chart :data-input="timeSeriesData" :title-text="'Submission Time Series'" class="chart"></time-line-chart>
      <line-chart :data-input="historicalAcceptanceRate" :title-text="'Past Years Acceptance Rates'" class="chart"></line-chart>

      <el-select v-model="acceptanceRateChartType" placeholder="Select Chart" style="margin-top: 20px; margin-right: 10px">
        <el-option
          v-for="item in chartOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <bar-chart-deci :data-input="acceptanceRateByTrackData" :title-text="'Acceptance Rate By Track'" class="chart" v-if="acceptanceRateChartType=='bar'"></bar-chart-deci>
      <radar-chart :data-input="acceptanceRateByTrackData" :title-text="'Acceptance Rate By Track'" class="chart" v-else-if="acceptanceRateChartType=='radar'"></radar-chart>

      <el-select v-model="topAcceptedAuthorsDataLength" placeholder="Select Length" style="margin-top: 20px;margin-right: 10px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <hori-bar-chart :data-input="topAcceptedAuthorsData" :title-text="'Top Accepted Authors'" class="chart"></hori-bar-chart>

      <!--Note: due to the constraint of the component, the style width and height must be specified-->
      <h4>Word Cloud for All Submissions</h4>
      <vue-word-cloud :words="wordCloudTotal" :animationDuration="50" font-family="Roboto" style="width: 70%;height: 200px"></vue-word-cloud>
      <h4>Word Cloud for Accepted Papers</h4>
      <vue-word-cloud :words="acceptedWordCloud" :animationDuration="50" font-family="Roboto" style="width: 70%;height: 200px"></vue-word-cloud>
      <h4>Word Cloud for Submissions by Track</h4>
      <el-select v-model="wordCloudSelectedTrack" placeholder="Select Length" style="margin-top: 10px;margin-right: 10px">
        <el-option
          v-for="item in trackOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <vue-word-cloud :words="wordCloudByTrack[wordCloudSelectedTrack]" :animationDuration="100" font-family="Roboto" style="width: 70%;height: 200px"></vue-word-cloud>
      <el-button @click="saveToPdf" type="success" plain style="margin-top: 20px">Save</el-button>

    </div> <!--End of Submission Component-->


    <div v-else-if="infoType === 'review'"> <!--Start of Review Component-->
      <bar-chart :data-input="scoreDistributionData" :title-text="'Score Distribution'" class="chart"></bar-chart>
      <bar-chart :data-input="recommendDistributionData" :title-text="'Recommendation Distribution'" class="chart"></bar-chart>
    </div> <!--End of Review Component-->


    <div v-else-if="infoType === 'dummy'"> <!--Start of Dummy Component-->
      <line-chart :dataInput="data" v-if="type == 'line'"></line-chart>
      <bar-chart :dataInput="data" v-else-if="type == 'bar'"></bar-chart>
    </div> <!--End of Dummy Component-->


  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import TimeLineChart from '@/components/TimeLineChart'
import RadarChart from '@/components/RadarChart'
import BarChart from '@/components/BarChart'
import BarChartDeci from '@/components/BarChartDeci'
import HoriBarChart from '@/components/HoriBarChart'
import PieChart from '@/components/PieChart'

import EditableText from '@/components/EditableText'

import Const from './const'

import VueWordCloud from 'vuewordcloud'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'Chart',
  props: ['chartData', 'infoType'],
  data: function () {
    if (this.infoType == 'author') { // author.csv input

      var authorInitialText = "So it's rather clear that the one with the largest number of submissions this year is: " + this.chartData.topAuthors.labels[0] + ", and all the top " + String(3) + ", putting together, contribute " + String(this.chartData.topAuthors.data.slice(0, 3).reduce(function(a, b) {return a + b;})) + " submissions in total.";

      var countryInitialText = "And from the country information (generated from the author data), we can see that the top 1 country, in this case " + this.chartData.topCountries.labels[0] + ", has made " + String(((this.chartData.topCountries.data[0] - this.chartData.topCountries.data[1]) / this.chartData.topCountries.data[1] * 100).toFixed(2)) + "% more submission than the second-placed " + this.chartData.topCountries.labels[1] + ".";

      return {
        msg: 'Author Info Analysis',
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
        msg: 'Statistics',
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

    } else if (this.infoType == 'submission') {

      // console.log("inside submission subsection");

      return {
        msg: 'Submission Info Analysis',
        acceptanceRate: this.chartData.acceptanceRate.toFixed(2),
        acceptanceRateSelectedTrack: 'Full Papers',
        wordCloudSelectedTrack: 'Full Papers',
        trackOptions: this.getTrackInSubmission().map(function (track) {return {value: track, label: track};}),
        chartOptions: [
          {
            value: 'bar',
            label: 'Bar Chart'
          }, {
            value: 'radar',
            label: 'Radar Chart'
          }
        ],
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
        acceptanceRateChartType: 'bar',
        wordCloudTotal: this.chartData.overallKeywordList,
        acceptedWordCloud: this.chartData.acceptedKeywordList,
        wordCloudByTrack: this.chartData.keywordsByTrack,
        acceptanceRateByTrackData: this.computeAcceptanceRateByTrack(),
        topAcceptedAuthorsData: this.computeTopAcceptedAuthors(3),
        topAcceptedAuthorsDataLength: 3,
        historicalAcceptanceRate: this.computeHistoricalAcceptanceRate(),
        timeSeriesData: this.computeTimeSeriesData(),
      }

    } else if (this.infoType == 'review') {

      return {
        msg: 'Review Info Analysis',
        scoreDistributionData: this.computeScoreDistributionData("score"),
        recommendDistributionData: this.computeScoreDistributionData("recommend"),
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
    saveToPdf: function() {
      let fileName = 'Visual Analysis';
      var leftMargin = 15;
      var rightMargin = 15;
      var pdfInMM = 210;
      var doc = new jsPDF("p", "mm", "a4");
      // doc.text("Hello World", 10, 10);
      var lines = doc.splitTextToSize(this.authorText.val, (pdfInMM - leftMargin - rightMargin));
      doc.text(leftMargin, 20, lines);
      html2canvas(document.getElementById('testpdf')).then(canvas => {
        var imageData = canvas.toDataURL("image/png");
        doc.addImage(imageData, 'PNG', 15, 50, canvas.width / 8, canvas.height / 8);

        doc.save(fileName + '.pdf');
      });
      // html2canvas(dom, {
      //   onrendered: function(canvas) {
      //     var image = new Image();
      //     image.src = canvas.toDataURL();
      //     document.getElementById()
      //   }
      // });
      // html2canvas(document.querySelector('testpdf')).then(canvas => {
      //   var imageData = canvas.toDataURL("image/png");
      //   doc.addImage(imageData, 'PNG');
      //   doc.save(fileName + '.pdf');
      // });
      // doc.save(fileName + ".pdf");
    },
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
    },
    getTrackInSubmission: function() {
      return Object.keys(this.chartData.acceptanceRateByTrack);
    },
    computeTopWordClouds: function(wordCountMap) {
      var wordsSorted = Object.keys(wordCountMap).sort(function(a, b){return wordCountMap[b]-wordCountMap[a]}).slice(0, 20);
      var topWordCloud = {};
      wordsSorted.forEach(function( word ) {
        topWordCloud[word] = wordCountMap[word];
      });
      return topWordCloud;
    },
    computeAcceptanceRateByTrack: function() {
      var tracks = this.getTrackInSubmission();
      var values = [];
      for(var track in tracks) {
        values.push(this.chartData.acceptanceRateByTrack[tracks[track]].toFixed(2));
      }
      return {
        labels: tracks,
        datasets: [
          {
            label: 'Acceptance Rate',
            backgroundColor: this.chooseColorScheme(10),
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: values,
          }
        ]
      }
    },
    computeTopAcceptedAuthors: function(len) {
      var authors = this.chartData.topAcceptedAuthors.names.slice(0, len);
      // var authors = Object.keys(this.chartData.topAcceptedAuthors);
      var values = this.chartData.topAcceptedAuthors.counts.slice(0, len);
      var scheme = this.chooseColorScheme(len);
      // var values = authors.map(function(author) {return this.chartData.topAcceptedAuthors[author];});
      return {
        labels: authors,
        datasets: [
          {
            label: 'Accepted Papers',
            backgroundColor: scheme,
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: values,
          }
        ]
      }
    },
    computeHistoricalAcceptanceRate: function() {
      var years = this.chartData.comparableAcceptanceRate.year;
      console.log("got to the acceptance rate function");
      return {
        labels: years,
        datasets: [
          {
            label: 'Full Papers',
            // backgroundColor: this.chooseColorScheme(10),
            borderColor: 'blue',
            fill: false,
            pointBackgroundColor: 'white',
            borderWidth: 2,
            pointBorderColor: 'blue',
            pointHoverRadius: 5,
            data: this.chartData.comparableAcceptanceRate['Full Papers'],
          },
          {
            label: 'Short Papers',
            // backgroundColor: this.chooseColorScheme(10),
            borderColor: 'red',
            fill: false,
            pointBackgroundColor: 'white',
            borderWidth: 2,
            pointBorderColor: 'red',
            pointHoverRadius: 5,
            data: this.chartData.comparableAcceptanceRate['Short Papers'],
          }
        ]
      }
    },
    computeTimeSeriesData: function() {
      var time = this.chartData.timeSeries.time;
      return {
        datasets: [
          {
            label: 'Submit Time',
            data: this.chartData.timeSeries,
            fill: false,
            // pointBorderColor: '#249EBF',
            radius: 0,
            borderColor: 'blue'
          },
          {
            label: 'Last Edit Time',
            data: this.chartData.lastEditSeries,
            fill: false,
            // pointBorderColor: '#249EBF',
            radius: 0,
            borderColor: 'red'
          }
        ]
      }
    },
    computeScoreDistributionData: function(type) {
      // Type: "score" or "recommend"
      var label = type == "score"? 'Average Score':'Average Recommendation';
      var rawData = type == "score"? this.chartData.scoreDistribution:this.chartData.recommendDistribution;
      return {
        labels: rawData.labels,
        datasets: [{
          label: label,
          data: rawData.counts,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
        }]
      }
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
    },
    topAcceptedAuthorsDataLength: function(newValue, oldValue) {
      var len = newValue;
      this.topAcceptedAuthorsData = this.computeTopAcceptedAuthors(len);
    }
  },
  components: {
    LineChart,
    TimeLineChart,
    RadarChart,
    BarChart,
    BarChartDeci,
    HoriBarChart,
    PieChart,
    EditableText,
    [VueWordCloud.name]: VueWordCloud,
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
