import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import acc_fault from '@/components/acc_fault'
import data_de from '@/components/data_de'
import data_de_1 from '@/components/data_de_1'
import data_de_2 from '@/components/data_de_2'
import data_de_3 from '@/components/data_de_3'
import data_de_5 from '@/components/data_de_5'
import data_status_check from '@/components/data_status_check'
import ele_conf from '@/components/ele_conf'
import sysPramsDetails from '@/components/sysPramsDetails'
import test_view from '@/components/test_view'
Vue.use(Router)

export default new Router({
	mode:"history",//去除/#
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      path: '/acc_fault',
      name: 'acc_fault',
      component: acc_fault,
      
    },
    {
      path: '/data_de',
      name: 'data_de',
      component: data_de
    },
    {
    	path: '/data_de_1',
    	name: 'data_de_1',
    	component: data_de_1
    },
		{
			path: '/data_de_2',
			name: 'data_de_2',
			component: data_de_2
		},
		{
			path: '/data_de_3',
			name: 'data_de_3',
			component: data_de_3
		},
		{
			path: '/data_de_5',
			name: 'data_de_5',
			component: data_de_5
		},
		{
			path: '/data_status_check',
			name: 'data_status_check',
			component: data_status_check
		},
		{
			path: '/ele_conf',
			name: 'ele_conf',
			component: ele_conf
		},
		{
			path: '/sysPramsDetails',
			name: 'sysPramsDetails',
			component: sysPramsDetails
		},
		{
			path: '/test_view',
			name: 'test_view',
			component: test_view
		},
  ]
})
