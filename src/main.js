// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/js/dist/dropdown.js'
Vue.use(BootstrapVue)

Vue.config.productionTip = false
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
})
