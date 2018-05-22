<template>
  <chart :options="polar"></chart>
</template>

<style>
.echarts {
  height: 450px;
}
</style>

<script>
export default {
  data: function () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI + Math.PI
      var r = Math.sin(t) * Math.sqrt(Math.abs(Math.cos(t))) / (Math.sin(t) + 7.0 / 5) - 2 * Math.sin(t) + 2
      data.push([r, i])
    }

    return {
      polar: {
        title: {
          text: 'Test Polar Axis',
          show: true
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '50%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 1000
      }
    }
  }
}
</script>
