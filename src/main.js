// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ECharts from 'vue-echarts/components/ECharts'

// import ECharts modules manually to reduce bundle size
// for each plot category (line, bar, etc), it must be imported here manually otherwise cannot be used
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/line'

// import VueWordCloud from 'vuewordcloud';

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.component('chart', ECharts)
// Vue.component(VueWordCloud.name, VueWordCloud)
// Vue.use(ECharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
