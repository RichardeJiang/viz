import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import EC from '@/components/EC'
import Chart from '@/components/Chart'
import Result from '@/components/Result'
import TE from '@/components/Te'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      props: true
    },
    // {
    // 	path: '/ec',
    // 	name: 'EC',
    // 	component: EC
    // },
    {
      path: '/te',
      name: 'TE',
      component: TE
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart,
      props: true
    },
    {
      path: '/result/:inputFileName',
      name: 'Result',
      component: Result,
      props: true
    }
  ]
})
