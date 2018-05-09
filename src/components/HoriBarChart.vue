<script>
  //Importing Line class from the vue-chartjs wrapper
  import {HorizontalBar} from 'vue-chartjs'
  //Exporting this so it can be used in other components

  export default {
    extends: HorizontalBar,
    props: ['dataInput'],
    data () {
      return {
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              // ticks: {
              //   beginAtZero: true
              // },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
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
    }
  }
</script>