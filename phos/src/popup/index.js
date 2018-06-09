import Vue from 'vue'
import root from './root.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import Login from './Login.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: root },
    { path: '/login', component: Login }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#root',
  router,
  render: h => h(root)
})
