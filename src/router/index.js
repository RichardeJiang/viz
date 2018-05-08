import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloAgain from '@/components/HelloAgain'
import EC from '@/components/EC'
import Chart from '@/components/Chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      props: true
    },
    {
    	path: '/add',
    	name: 'HelloAgain',
    	component: HelloAgain
    },
    {
    	path: '/ec',
    	name: 'EC',
    	component: EC
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart,
      props: true
    }
  ]
})
