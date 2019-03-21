{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
import Config from '@/config'
{{#vuex}}
import store from './common/store'
{{/vuex}}

require('./sass/app.scss')

Vue.config.productionTip = false

import registerComponents from '@/common/components'
import registerMixins from './mixins.js'

registerComponents(Vue)
registerMixins(Vue)

/* eslint-disable no-new */
new Vue({
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  render: h => h(App)
}).$mount('#app')
