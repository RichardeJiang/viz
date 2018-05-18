<script>
  //Importing Line class from the vue-chartjs wrapper
  import {HorizontalBar} from 'vue-chartjs'
  //Exporting this so it can be used in other components

  export default {
    extends: HorizontalBar,
    props: ['dataInput', 'titleText'],
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
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                    if (Math.floor(value) === value) {
                        return value;
                    }
                }
              },
              gridLines: {
                display: true
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
      this.renderChart(this.dataInput, this.options)
    },
    watch: { 
      dataInput: function() {
        console.log("Got it in the bar chart!");
        this.renderChart(this.dataInput, this.options); 
      } 
    }
  }
</script>