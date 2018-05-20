<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Line} from 'vue-chartjs'
  import chartjsPluginAnnotation from "chartjs-plugin-annotation";

  //Exporting this so it can be used in other components

  export default {
    extends: Line,
    props: ['dataInput', 'titleText', 'annotation'],
    computed: {
      chartData: function() {
        return this.dataInput;
      }
    },
    data () {
      return {
        //Chart.js options that controls the appearance of the chart
        options: {
          // annotation: {
          //   annotations: [
          //     {
          //       type: "line",
          //       mode: "vertical",
          //       scaleID: "x-axis-0",
          //       value: "2018-01-18",
          //       borderDash: [4,4],
          //       // borderDashOffset: 5,
          //       borderColor: "red",
          //       label: {
          //         content: "Papers, Tutorial, and Wordshop Deadline",
          //         enabled: true,
          //         position: "top",
          //         xAdjust: 55,
          //         yAdjust: 8,
          //       }
          //     }, 
          //     {
          //       type: "line",
          //       mode: "vertical",
          //       scaleID: "x-axis-0",
          //       value: "2018-02-02",
          //       borderDash: [4,4],
          //       // borderDashOffset: 5,
          //       borderColor: "red",
          //       label: {
          //         content: "Panel, Poster, and Demo Deadline",
          //         enabled: true,
          //         position: "top",
          //         xAdjust: -35,
          //         yAdjust: 45,
          //       }
          //     }
          //   ]
          // },
          title: {
            display: true,
            text: this.titleText,
            fontSize: 14
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                // stepSize: 1
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              type: "time",
              time: {
                parser: "YYYY-MM-DD",
                tooltipFormat: 'll'
              },
              gridLines: {
                display: false
              },
              // ticks: {
              //   autoSkip: false
              // },
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      // this.renderChart(this.dataInput, this.options);
      this.render();
    },
    methods: {
      render: function() {
        this.options.annotation = this.annotation;
        this.renderChart(this.chartData, this.options);
      }
    },
    watch: { 
      dataInput: function() {
        console.log("Got it in the bar chart!");
        this.$data._chart.destroy();
        this.render();
        // this.renderChart(this.dataInput, this.options); 
      } 
    }
  }
</script>