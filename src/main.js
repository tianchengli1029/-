// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/elevator.css'/*引入公共样式*/
import config from './js/config.js'     //引入公用url
import utils from './js/utils.js'     //引入公用工具包
import sys from './js/sys.js'     //引入公用https
import https from './js/https.js'     //引入公用工具包
import socket from './js/socket.js'     //引入socket.js
import ElementUI from 'element-ui'	//引入整个element
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false//设置为 false 以阻止 vue 在启动时生成生产提示。

Vue.use(ElementUI)
Vue.prototype.$config = config      //添加到vue属性中
Vue.prototype.$sys = sys  //添加到vue属性中
Vue.prototype.$utils = utils  //添加到vue属性中
Vue.prototype.$https = https   //添加到vue属性中
Vue.prototype.$socket = socket   //添加到vue属性中
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
