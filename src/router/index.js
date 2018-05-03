import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloAgain from '@/components/HelloAgain'
import EC from '@/components/EC'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
