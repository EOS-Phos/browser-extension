import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Login from './login.vue'
import Sharing from './sharing.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/sharing', component: Sharing }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#root',
  router: router,
  render: h => h(Login)
})
