import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'
import Service from '../views/Service.vue'
import Art from '../views/Art.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/service',
    name: 'Service',
    component: Service
  },
  {
    path: '/art/:id',
    name: 'Art',
    component: Art
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
