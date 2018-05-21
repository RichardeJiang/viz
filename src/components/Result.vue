<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="infoType === 'author'"> <!--Start of Author Component-->

      <el-select v-model="authorDataLength" placeholder="Select Length" style="margin-top: 10px;margin-right: 40px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-switch
        v-model="authorChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <!-- <P>
        {{authorChartIncluded}}
      </p> -->
      <bar-chart :data-input="topAuthorData" :title-text="'Top Authors'" class="chart" id="topauthorchart" ref="topauthorchart"></bar-chart>
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
      <el-select v-model="countryDataLength" placeholder="Select Length" style="margin-top: 20px;margin-right: 30px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-switch
        v-model="countryChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <div id="topcountrychart" ref="topcountrychart">
        <hori-bar-chart v-bind:data-input="topCountryData" :title-text="'Top Countries'" class="chart" v-if="countryChartType=='bar'"></hori-bar-chart>
        <pie-chart v-bind:data-input="topCountryData" :title-text="'Top Countries'" class="chart" v-else-if="countryChartType=='pie'"></pie-chart>
      </div>
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
      <el-switch
        v-model="affiliationChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <div id="topaffiliationchart" ref="topaffiliationchart">
        <hori-bar-chart :data-input="topAffiliationData" :title-text="'Top Affiliations'" class="chart" v-if="affiliationChartType=='bar'"></hori-bar-chart>
        <pie-chart :data-input="topAffiliationData" :title-text="'Top Affiliations'" class="chart" v-else-if="affiliationChartType=='pie'"></pie-chart>
      </div>
      <editable-text v-bind:text.sync="affiliationText"></editable-text>

      <el-button @click="saveAuthor" type="success" plain style="margin-top: 10px">Save</el-button>

    </div> <!--End of Author Component-->


    <div v-else-if="infoType === 'submission'"> <!--Start of Submission Component-->
      <el-switch
        v-model="timeSeriesChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <time-line-chart :data-input="timeSeriesData" :title-text="'Submission Time Series'" :annotation="JCDLAnnotation" class="chart" id="timeserieschart" ref="timeserieschart"></time-line-chart>
      <editable-text v-bind:text.sync="timeseriesText" style="margin-bottom: 20px;"></editable-text>

      <el-switch
        v-model="historicalAcceptanceChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <line-chart :data-input="historicalAcceptanceRate" :title-text="'Past Years Acceptance Rates'" class="chart" id="historicalchart" ref="historicalchart"></line-chart>
      <editable-text v-bind:text.sync="historicalAcceptanceText"></editable-text>

      <el-select v-model="acceptanceRateChartType" placeholder="Select Chart" style="margin-top: 20px; margin-right: 30px">
        <el-option
          v-for="item in chartOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-switch
        v-model="acceptanceRateByTrackChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <div id="acceptancechart" ref="acceptancechart">
        <bar-chart-deci :data-input="acceptanceRateByTrackData" :title-text="'Acceptance Rate By Track'" class="chart" v-if="acceptanceRateChartType=='bar'"></bar-chart-deci>
        <radar-chart :data-input="acceptanceRateByTrackData" :title-text="'Acceptance Rate By Track'" class="chart" v-else-if="acceptanceRateChartType=='radar'"></radar-chart>
      </div>
      <editable-text v-bind:text.sync="acceptanceRateByTrackText"></editable-text>

      <el-select v-model="topAcceptedAuthorsDataLength" placeholder="Select Length" style="margin-top: 20px;margin-right: 30px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-switch
        v-model="topAcceptedAuthorsChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <hori-bar-chart :data-input="topAcceptedAuthorsData" :title-text="'Top Accepted Authors/Contributors'" class="chart" id="topacceptedauthorchart" ref="topacceptedauthorchart"></hori-bar-chart>
      <editable-text v-bind:text.sync="topAcceptedAuthorsText" style="margin-bottom: 20px;"></editable-text>

      <el-select v-model="topAcceptedAuthorsByTrackLength" placeholder="Select Length" style="margin-top: 20px;margin-right: 10px">
        <el-option
          v-for="item in dataLengthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="topAcceptedAuthorsSelectedTrack" placeholder="Select Length" style="margin-top: 10px;margin-right: 30px">
        <el-option
          v-for="item in trackOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-switch
        v-model="topAcceptedAuthorsByTrackChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <hori-bar-chart :data-input="topAcceptedAuthorsByTrackData" :title-text="'Top Accepted Authors'" class="chart" id="topacceptedauthorbytrackchart" ref="topacceptedauthorbytrackchart"></hori-bar-chart>
      <editable-text v-bind:text.sync="topAcceptedAuthorsByTrackText" style="margin-bottom: 20px;"></editable-text>

      <!--Note: due to the constraint of the component, the style width and height must be specified-->
      <el-switch
        v-model="wordCloudAllIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <div id="wordcloudall" ref="wordcloudall">
        <h4>Word Cloud for All Submissions</h4>
        <vue-word-cloud :words="wordCloudTotal" 
                        :animationDuration="50" 
                        :color="([, weight]) => weight > 10 ? 'Red' : weight > 5 ? 'Blue' : 'Black'"
                        font-family="Roboto" 
                        style="width: 70%;height: 200px"></vue-word-cloud>
      </div>

      <el-switch
        v-model="wordCloudAcceptedIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <div id="wordcloudaccept" ref="wordcloudaccept">
        <h4>Word Cloud for Accepted Papers</h4>
        <vue-word-cloud :words="acceptedWordCloud" 
                        :animationDuration="50" 
                        :color="([, weight]) => weight > 10 ? 'Red' : weight > 5 ? 'Blue' : 'Black'"
                        font-family="Roboto" 
                        style="width: 70%;height: 200px"></vue-word-cloud>
      </div>

      <el-switch
        v-model="wordCloudByTrackIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <div id="wordcloudtrack" ref="wordcloudtrack">
        <h4>Word Cloud for Submissions by Track</h4>
        <el-select v-model="wordCloudSelectedTrack" placeholder="Select Length" style="margin-top: 10px;margin-right: 10px">
          <el-option
            v-for="item in trackOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <vue-word-cloud :words="wordCloudByTrack[wordCloudSelectedTrack]" 
                        :animationDuration="100" 
                        :color="([, weight]) => weight > 10 ? 'Red' : weight > 5 ? 'Blue' : 'Black'"
                        font-family="Roboto" 
                        style="width: 70%;height: 200px"></vue-word-cloud>
      </div>
      <el-button @click="saveSubmission" type="success" plain style="margin-top: 20px">Save</el-button>

    </div> <!--End of Submission Component-->


    <div v-else-if="infoType === 'review'"> <!--Start of Review Component-->
      <el-switch
        v-model="scoreDistributionChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <bar-chart :data-input="scoreDistributionData" :title-text="'Score Distribution'" class="chart" id="scorechart" ref="scorechart"></bar-chart>
      <editable-text v-bind:text.sync="scoreDistributionText" style="margin-bottom: 20px;"></editable-text>

      <el-switch
        v-model="recommendDistributionChartIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <bar-chart :data-input="recommendDistributionData" :title-text="'Recommendation Distribution'" class="chart" id="recommendchart" ref="recommendchart"></bar-chart>
      <editable-text v-bind:text.sync="recommendDistributionText" style="margin-bottom: 20px;"></editable-text>

      <el-switch
        v-model="reviewTableIncluded"
        active-color="#13ce66"
        active-text="Included in Report"
        inactive-text="Not Included">
      </el-switch>
      <p>
        The mean scores and mean confidence values can be found as follows:
        <div id="reviewtable" ref="reviewtable">
          <el-table
            :data="reviewTableData"
            stripe
            style="width: 70%;margin-top:10px;margin-bottom: 10px">
            <el-table-column
              prop="field"
              label="Field"
              width="180">
            </el-table-column>
            <el-table-column
              prop="value"
              label="Value"
              width="180">
            </el-table-column>
          </el-table>
        </div>
        <editable-text v-bind:text.sync="reviewTableText"></editable-text>
      </p>
      <el-button @click="saveReview" type="success" plain style="margin-top: 10px">Save</el-button>
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
      var tracks = this.computeAcceptanceRateByTrack().labels;
      var acceptanceRate = this.computeAcceptanceRateByTrack().datasets[0].data;

      var topIndex = this.indexOfMax(acceptanceRate);
      var topTrack = tracks[topIndex];
      var topValue = acceptanceRate[topIndex]*100;

      return {
        msg: 'Submission Info Analysis',
        acceptanceRate: this.chartData.acceptanceRate.toFixed(2),
        acceptanceRateSelectedTrack: 'Full Papers',
        topAcceptedAuthorsSelectedTrack: 'Full Papers',
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
        topAcceptedAuthorsByTrackData: this.computeTopAcceptedAuthorsByTrack(3, 'Full Papers'),
        topAcceptedAuthorsByTrackLength: 3,
        topAcceptedAuthorsByTrackChartIncluded: true,
        historicalAcceptanceRate: this.computeHistoricalAcceptanceRate(),
        timeSeriesData: this.computeTimeSeriesData(),
        JCDLAnnotation: this.computeJCDLDeadlineData(),
        timeSeriesChartIncluded: true,
        timeseriesText: {
          val: "It can be identified clearly from the chart that most researchers won't submit their work until the last moment :-). Additionally, although some people made changes to their work after the first submission, the vast majority of people create the entry and make it the final version, since the red curve and blue curve overlaps in most of the time.",
          // val: "This is a sample text.",
          edit: false
        },
        historicalAcceptanceText: {
          val: "The historical data on the acceptance rate of JCDL can be found here, appending this year's data in the end. You might notice that for full papers, the rate has seen a major increase from earlier works, while there have been some fluctuations for short papers.",
          edit: false
        },
        acceptanceRateByTrackText: {
          val: "Then for this year's work, we can divide them into different tracks to examine the details: the track " + String(topTrack) + " has the largest acceptance rate, at around " + String(topValue.toFixed(2)) + "%. Noticeably, Doctoral Consortium and Tutorials didn't take in any entries this year.",
          edit: false
        },
        topAcceptedAuthorsText: {
          val: "As for the authors, congratulations to Prof. " + String(this.chartData.topAcceptedAuthors.names[0]) + " for getting " + String(this.chartData.topAcceptedAuthors.counts[0]) + " papers/projects accepted to JCDL 2018.",
          edit: false
        },
        topAcceptedAuthorsByTrackText: {
          val: "You may want to dig into different tracks of submissions, and here you can check out the researchers who contribute the most to the selected track.",
          edit: false
        },
        historicalAcceptanceChartIncluded: true,
        acceptanceRateByTrackChartIncluded: true,
        topAcceptedAuthorsChartIncluded: true,
        wordCloudAllIncluded: true,
        wordCloudAcceptedIncluded: true,
        wordCloudByTrackIncluded: true,
      }

    } else if (this.infoType == 'review') {
      return {
        msg: 'Review Info Analysis',
        scoreDistributionData: this.computeScoreDistributionData("score"),
        recommendDistributionData: this.computeScoreDistributionData("recommend"),
        reviewTableData: [
          {
            field: 'Mean Score',
            value: this.chartData.meanScore.toFixed(2)
          }, {
            field: 'Mean Recommendation',
            value: this.chartData.meanRecommend.toFixed(2)
          }, {
            field: 'Mean Confidence',
            value: this.chartData.meanConfidence.toFixed(2)
          }
        ],
        scoreDistributionChartIncluded: true,
        recommendDistributionChartIncluded: true,
        reviewTableIncluded: true,
        scoreDistributionText: {
          val: "This is a sample text.",
          edit: false
        },
        recommendDistributionText: {
          val: "This is a sample text.",
          edit: false
        },
        reviewTableText: {
          val: "This is a sample text.",
          edit: false
        }
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
    saveAuthor: function() {
      let fileName = 'Author Submission Visual Analysis';
      var leftMargin = Const.pdfLeftMargin;
      var rightMargin = Const.pdfRightMargin;
      var pdfInMM = Const.pdfInMM;
      var initialTopMargin = Const.pdfTopMargin;
      var doc = new jsPDF("p", "mm", "a4");
      var title = "Author Submission Visual Analysis";
      doc.setFont("Times");
      doc.setFontSize(Const.pdfTitleFontSize);
      var titleLength = doc.getStringUnitWidth(title) * Const.pdfTitleFontSize * Const.pdfMMPerPT;
      doc.text((pdfInMM - leftMargin - rightMargin - titleLength) / 2.0 + leftMargin, initialTopMargin, title);
      var startingTopMargin = initialTopMargin + Const.pdfTitleFontSize * Const.pdfMMPerPT;
      doc.setFontSize(Const.pdfTextFontSize);

      // Attn: For the current impl, the logic is as follows:
      // 1. each page of the PDF file will contain 2 images, together with their texts
      // 2. hence, we use this numOfAddedSections to keep track of how many we have added to PDF
      // 3. so if numOfAddedSections % 2 == 1, then no need to addPage(); else if num > 0, then addPage() and reset topMargin
      var numOfAddedSections = 0;

      html2canvas(document.getElementById('topauthorchart')).then(authorCanvas => {
        var topMarginAfterAuthor = startingTopMargin;
        if (this.authorChartIncluded) {
          numOfAddedSections += 1;
          var authorImageData = authorCanvas.toDataURL("image/png");
          doc.addImage(authorImageData, 'PNG', 15, startingTopMargin, authorCanvas.width / 8, authorCanvas.height / 8);

          var authorTextLines = doc.splitTextToSize(this.authorText.val, (pdfInMM - leftMargin - rightMargin));
          doc.text(leftMargin, startingTopMargin + authorCanvas.height / 8 + 10, authorTextLines);

          // Note: here pdfLineHeight is the line height considering the white space between lines
          var authorTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * authorTextLines.length;
          topMarginAfterAuthor = startingTopMargin + authorCanvas.height / 8 + authorTextLinesHeight - 5;
        }
        // var authorImageData = authorCanvas.toDataURL("image/png");
        // doc.addImage(authorImageData, 'PNG', 15, startingTopMargin, authorCanvas.width / 8, authorCanvas.height / 8);

        // var authorTextLines = doc.splitTextToSize(this.authorText.val, (pdfInMM - leftMargin - rightMargin));
        // doc.text(leftMargin, startingTopMargin + authorCanvas.height / 8 + 10, authorTextLines);

        // // Note: here pdfLineHeight is the line height considering the white space between lines
        // var authorTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * authorTextLines.length;
        // var topMarginAfterAuthor = startingTopMargin + authorCanvas.height / 8 + authorTextLinesHeight - 5;

        html2canvas(document.getElementById('topcountrychart')).then(countryCanvas => {
          var topMarginAfterCountry = topMarginAfterAuthor;
          if (this.countryChartIncluded) {
            numOfAddedSections += 1;
            var countryImageData = countryCanvas.toDataURL("image/png");
            doc.addImage(countryImageData, 'PNG', 15, topMarginAfterAuthor, countryCanvas.width / 8, countryCanvas.height / 8);

            var countryTextLines = doc.splitTextToSize(this.countryText.val, (pdfInMM - leftMargin - rightMargin));
            doc.text(leftMargin, topMarginAfterAuthor + countryCanvas.height / 8 + 10, countryTextLines);

            if (numOfAddedSections % 2 == 1) {
              var countryTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * countryTextLines.length;
              topMarginAfterCountry = topMarginAfterAuthor + countryCanvas.height / 8 + countryTextLinesHeight - 5;

            }

          }
          // var countryImageData = countryCanvas.toDataURL("image/png");
          // doc.addImage(countryImageData, 'PNG', 15, topMarginAfterAuthor, countryCanvas.width / 8, countryCanvas.height / 8);

          // var countryTextLines = doc.splitTextToSize(this.countryText.val, (pdfInMM - leftMargin - rightMargin));
          // doc.text(leftMargin, topMarginAfterAuthor + countryCanvas.height / 8 + 10, countryTextLines);

          // var countryTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * countryTextLines.length;

          // doc.addPage();
          // var topMarginAfterCountry = Const.pdfTopMargin;

          html2canvas(document.getElementById('topaffiliationchart')).then(affiliationCanvas => {
            if (this.affiliationChartIncluded) {
              if (numOfAddedSections % 2 == 0 && numOfAddedSections > 0) {
                doc.addPage();
                topMarginAfterCountry = Const.pdfTopMargin;
              }
              var affiliationImageData = affiliationCanvas.toDataURL("image/png");
              doc.addImage(affiliationImageData, 'PNG', 15, topMarginAfterCountry, affiliationCanvas.width / 8, affiliationCanvas.height / 8);

              var affiliationTextLines = doc.splitTextToSize(this.affiliationText.val, (pdfInMM - leftMargin - rightMargin));
              doc.text(leftMargin, topMarginAfterCountry + affiliationCanvas.height / 8 + 10, affiliationTextLines);
            } 
            // var affiliationImageData = affiliationCanvas.toDataURL("image/png");
            // doc.addImage(affiliationImageData, 'PNG', 15, topMarginAfterCountry, affiliationCanvas.width / 8, affiliationCanvas.height / 8);

            // var affiliationTextLines = doc.splitTextToSize(this.affiliationText.val, (pdfInMM - leftMargin - rightMargin));
            // doc.text(leftMargin, topMarginAfterCountry + affiliationCanvas.height / 8 + 10, affiliationTextLines);

            doc.save(fileName + '.pdf');
          });

        });

      });
    },
    saveSubmission: function() {
      let fileName = 'Submission Visual Analysis';
      var leftMargin = Const.pdfLeftMargin;
      var rightMargin = Const.pdfRightMargin;
      var pdfInMM = Const.pdfInMM;
      var initialTopMargin = Const.pdfTopMargin;
      var doc = new jsPDF("p", "mm", "a4");
      var title = "Submission Visual Analysis";
      doc.setFont("Times");
      doc.setFontSize(Const.pdfTitleFontSize);
      var titleLength = doc.getStringUnitWidth(title) * Const.pdfTitleFontSize * Const.pdfMMPerPT;
      doc.text((pdfInMM - leftMargin - rightMargin - titleLength) / 2.0 + leftMargin, initialTopMargin, title);
      var startingTopMargin = initialTopMargin + Const.pdfTitleFontSize * Const.pdfMMPerPT;
      doc.setFontSize(Const.pdfTextFontSize);

      var numOfAddedSections = 0;

      html2canvas(document.getElementById('timeserieschart')).then(timeCanvas => {
        var topMarginAfterTime = startingTopMargin;
        if (this.timeSeriesChartIncluded) {
          numOfAddedSections += 1;

          var timeImageData = timeCanvas.toDataURL("image/png");
          doc.addImage(timeImageData, 'PNG', 15, startingTopMargin, timeCanvas.width / 8, timeCanvas.height / 8);

          var timeTextLines = doc.splitTextToSize(this.timeseriesText.val, (pdfInMM - leftMargin - rightMargin));
          doc.text(leftMargin, startingTopMargin + timeCanvas.height / 8 + 5, timeTextLines);

          // Note: here pdfLineHeight is the line height considering the white space between lines
          var timeTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * timeTextLines.length;
          topMarginAfterTime = startingTopMargin + timeCanvas.height / 8 + timeTextLinesHeight - 25;

        }
        

        html2canvas(document.getElementById('historicalchart')).then(historicalCanvas => {
          var topMarginAfterHistorical = topMarginAfterTime;
          if (this.historicalAcceptanceChartIncluded) {
            numOfAddedSections += 1;

            var historicalImageData = historicalCanvas.toDataURL("image/png");
            doc.addImage(historicalImageData, 'PNG', 15, topMarginAfterTime, historicalCanvas.width / 8, historicalCanvas.height / 8);

            var historicalTextLines = doc.splitTextToSize(this.historicalAcceptanceText.val, (pdfInMM - leftMargin - rightMargin));
            doc.text(leftMargin, topMarginAfterTime + historicalCanvas.height / 8 + 5, historicalTextLines);

            if (numOfAddedSections % 2 == 1) {
              var historicalTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * historicalTextLines.length;
              topMarginAfterHistorical = topMarginAfterTime + historicalCanvas.height / 8 + historicalTextLinesHeight - 10;
            }
          }

          html2canvas(document.getElementById('acceptancechart')).then(acceptanceCanvas => {
            var topMarginAfterAccept = topMarginAfterHistorical;
            if (this.acceptanceRateByTrackChartIncluded) {
              if (numOfAddedSections % 2 == 0 && numOfAddedSections > 0) {
                doc.addPage();
                topMarginAfterHistorical = Const.pdfTopMargin;
              }

              numOfAddedSections += 1;
              var acceptImageData = acceptanceCanvas.toDataURL("image/png");
              doc.addImage(acceptImageData, 'PNG', 15, topMarginAfterHistorical, acceptanceCanvas.width / 8, acceptanceCanvas.height / 8);

              var acceptTextLines = doc.splitTextToSize(this.acceptanceRateByTrackText.val, (pdfInMM - leftMargin - rightMargin));
              doc.text(leftMargin, topMarginAfterHistorical + acceptanceCanvas.height / 8 + 5, acceptTextLines);

              if (numOfAddedSections % 2 == 1) {
                var acceptanceLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * acceptTextLines.length;
                topMarginAfterAccept = topMarginAfterHistorical + acceptanceCanvas.height / 8 + acceptanceLinesHeight - 20;
              }
            }

            html2canvas(document.getElementById('topacceptedauthorchart')).then(accAuthorCanvas => {
              var topMarginAfterTopAccAuthors = topMarginAfterAccept;
              if (this.topAcceptedAuthorsChartIncluded) {
                if (numOfAddedSections % 2 == 0 && numOfAddedSections > 0) {
                  doc.addPage();
                  topMarginAfterAccept = Const.pdfTopMargin;
                }

                numOfAddedSections += 1;
                var accAuthorImageData = accAuthorCanvas.toDataURL("image/png");
                doc.addImage(accAuthorImageData, 'PNG', 15, topMarginAfterAccept, accAuthorCanvas.width / 8, accAuthorCanvas.height / 8);

                var topAccAuthorsTextLines = doc.splitTextToSize(this.topAcceptedAuthorsText.val, (pdfInMM - leftMargin - rightMargin));
                doc.text(leftMargin, topMarginAfterAccept + accAuthorCanvas.height / 8 + 5, topAccAuthorsTextLines);

                if (numOfAddedSections % 2 == 1) {
                  var topAccAuthorsTextLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * topAccAuthorsTextLines.length;
                  topMarginAfterTopAccAuthors = topMarginAfterAccept + accAuthorCanvas.height / 8 + topAccAuthorsTextLinesHeight - 10;
                }
              }

              html2canvas(document.getElementById('topacceptedauthorbytrackchart')).then(accAuthorTrackCanvas => {
                var topMarginAfterTopAccAuthorsTrack = topMarginAfterTopAccAuthors;
                if (this.topAcceptedAuthorsByTrackChartIncluded) {
                  if (numOfAddedSections % 2 == 0 && numOfAddedSections > 0) {
                    doc.addPage();
                    topMarginAfterTopAccAuthors = Const.pdfTopMargin;
                  }

                  numOfAddedSections += 1;

                  var accAuthorTrackImageData = accAuthorTrackCanvas.toDataURL("image/png");
                  doc.addImage(accAuthorTrackImageData, 'PNG', 15, topMarginAfterTopAccAuthors, accAuthorTrackCanvas.width / 8, accAuthorTrackCanvas.height / 8);

                  var topAccAuthorsTrackTextLines = doc.splitTextToSize(this.topAcceptedAuthorsByTrackText.val, (pdfInMM - leftMargin - rightMargin));
                  doc.text(leftMargin, topMarginAfterTopAccAuthors + accAuthorTrackCanvas.height / 8 + 5, topAccAuthorsTrackTextLines);

                  if (numOfAddedSections % 2 == 1) {
                    var topAccAuthorsTrackLinesHeight = Const.pdfLineHeight * Const.pdfTextFontSize * topAccAuthorsTrackTextLines.length;
                    topMarginAfterTopAccAuthorsTrack = topMarginAfterTopAccAuthors + accAuthorTrackCanvas.height / 8 + topAccAuthorsTrackLinesHeight;
                  }
                }

                html2canvas(document.getElementById('wordcloudall')).then(wordAllCanvas => {

                  if (this.wordCloudAllIncluded) {
                    if (numOfAddedSections % 2 == 0 && numOfAddedSections > 0 ) {
                      doc.addPage();
                      topMarginAfterTopAccAuthorsTrack = Const.pdfTopMargin;
                    }

                    var wordAllImageData = wordAllCanvas.toDataURL("image/png");
                    doc.addImage(wordAllImageData, 'PNG', 15, topMarginAfterTopAccAuthorsTrack, wordAllCanvas.width / 8, wordAllCanvas.height / 8);
                  }
                  
                  doc.save(fileName + '.pdf');
                });

              });
  
            });

          });
        });
      });
    },
    saveReview: function() {
      let fileName = 'Review Visual Analysis';
      var leftMargin = Const.pdfLeftMargin;
      var rightMargin = Const.pdfRightMargin;
      var pdfInMM = Const.pdfInMM;
      var initialTopMargin = Const.pdfTopMargin;
      var doc = new jsPDF("p", "mm", "a4");
      var title = "Review Visual Analysis";
      doc.setFont("Times");
      doc.setFontSize(Const.pdfTitleFontSize);
      var titleLength = doc.getStringUnitWidth(title) * Const.pdfTitleFontSize * Const.pdfMMPerPT;
      doc.text((pdfInMM - leftMargin - rightMargin - titleLength) / 2.0 + leftMargin, initialTopMargin, title);
      var startingTopMargin = initialTopMargin + Const.pdfTitleFontSize * Const.pdfMMPerPT;
      doc.setFontSize(Const.pdfTextFontSize);

      html2canvas(document.getElementById('scorechart')).then(scoreCanvas => {
        var scoreImageData = scoreCanvas.toDataURL("image/png");
        doc.addImage(scoreImageData, 'PNG', 15, startingTopMargin, scoreCanvas.width / 8, scoreCanvas.height / 8);

        var scoreTextLines = doc.splitTextToSize(this.scoreDistributionText.val, (pdfInMM - leftMargin - rightMargin));
        doc.text(leftMargin, startingTopMargin + scoreCanvas.height / 8 + 10, scoreTextLines);

        var scoreTextHeight = Const.pdfLineHeight * Const.pdfTextFontSize * scoreTextLines.length;
        var topMarginAfterScore = startingTopMargin + scoreCanvas.height / 8 + scoreTextHeight + 5;

        html2canvas(document.getElementById('recommendchart')).then(recommendCanvas => {
          var recommendImageData = recommendCanvas.toDataURL("image/png");
          doc.addImage(recommendImageData, 'PNG', 15, topMarginAfterScore, recommendCanvas.width / 8, recommendCanvas.height / 8);

          var recommendTextLines = doc.splitTextToSize(this.recommendDistributionText.val, (pdfInMM - leftMargin - rightMargin));
          doc.text(leftMargin, topMarginAfterScore + recommendCanvas.height / 8 + 10, recommendTextLines);

          doc.addPage();
          var topMarginAfterRecommend = Const.pdfTopMargin;

          html2canvas(document.getElementById('reviewtable')).then(tableCanvas => {
            var tableImageData = tableCanvas.toDataURL("image/png");
            doc.addImage(tableImageData, 'PNG', 30, topMarginAfterRecommend, tableCanvas.width / 10, tableCanvas.height / 10);

            var tableTextLines = doc.splitTextToSize(this.reviewTableText.val, (pdfInMM - leftMargin - rightMargin));
            doc.text(leftMargin, topMarginAfterRecommend + tableCanvas.height / 10 + 10, tableTextLines);

            doc.save(fileName + '.pdf');
          });
        });
      });

    },
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
    indexOfMax: function(arr) {
      if (arr.length === 0) {
        return -1;
      }

      var max = arr[0];
      var maxIndex = 0;

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
        }
      }

      return maxIndex;
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
    computeTopAcceptedAuthorsByTrack: function(len, track) {
      var authors = this.chartData.topAuthorsByTrack[track].names.slice(0, len);
      var values = this.chartData.topAuthorsByTrack[track].counts.slice(0, len);
      console.log(authors);
      console.log(values);
      var scheme = this.chooseColorScheme(len);
      return {
        labels: authors,
        datasets: [
          {
            label: 'Paper Counts',
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
    computeJCDLDeadlineData: function() {
      return {
        annotations: [
          {
            type: "line",
            mode: "vertical",
            scaleID: "x-axis-0",
            value: "2018-01-18",
            borderDash: [4,4],
            borderColor: "red",
            label: {
              content: "Papers, Tutorial, and Wordshop Deadline",
              enabled: true,
              position: "top",
              xAdjust: 55,
              yAdjust: 8,
            }
          }, 
          {
            type: "line",
            mode: "vertical",
            scaleID: "x-axis-0",
            value: "2018-02-02",
            borderDash: [4,4],
            borderColor: "red",
            label: {
              content: "Panel, Poster, and Demo Deadline",
              enabled: true,
              position: "top",
              xAdjust: -35,
              yAdjust: 45,
            }
          }
        ]
      }
    },
    computeScoreDistributionData: function(type) {
      // Type: "score" or "recommend"
      var label = type == "score"? 'Score Counts':'Recommendation Counts';
      var rawData = type == "score"? this.chartData.scoreDistribution:this.chartData.recommendDistribution;
      return {
        labels: rawData.labels,
        datasets: [{
          label: label,
          data: rawData.counts,
          backgroundColor: 'rgba(52, 152, 219, 0.4)',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
        }]
      }
    },
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
    },
    topAcceptedAuthorsSelectedTrack: function(newValue, oldValue) {
      this.topAcceptedAuthorsByTrackData = this.computeTopAcceptedAuthorsByTrack(this.topAcceptedAuthorsByTrackLength, newValue);
    },
    topAcceptedAuthorsByTrackLength: function(newValue, oldValue) {
      var len = newValue;
      this.topAcceptedAuthorsByTrackData = this.computeTopAcceptedAuthorsByTrack(len, this.topAcceptedAuthorsSelectedTrack);
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
