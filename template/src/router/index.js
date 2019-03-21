import Vue from 'vue'
import Router from 'vue-router'
import routes from './routeConfig'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes
})
