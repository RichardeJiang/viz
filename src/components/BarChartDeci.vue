<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Bar} from 'vue-chartjs'
  //Exporting this so it can be used in other components

  export default {
    extends: Bar,
    props: ['dataInput', 'titleText'],
    computed: {
      chartData: function() {
        return this.dataInput;
      }
    },
    data () {
      return {
        //Chart.js options that controls the appearance of the chart
        options: {
          title: {
            display: true,
            text: this.titleText,
            fontSize: 14
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                // callback: function(value, index, values) {
                //     if (Math.floor(value) === value) {
                //         return value;
                //     }
                // }
                // stepSize: 1
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              },
              ticks: {
                autoSkip: false
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
      // this.renderChart(this.dataInput, this.options)
      this.render();
    },
    methods: {
      render: function() {
        this.renderChart(this.chartData, this.options);
      }
    },
    watch: { 
      dataInput: function() {
        console.log("Got it in the bar chart!");
        // this.renderChart(this.dataInput, this.options); 
        this.$data._chart.destroy();
        this.render();
        // this._chart.update();
      } 
    }
  }
</script>