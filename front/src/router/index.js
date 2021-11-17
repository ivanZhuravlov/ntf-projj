import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import Service from '../views/Service.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Art from '../views/Art.vue';
import CreateArtist from '../views/CreateArtist.vue';
import CreateCoA from '../views/CreateCoA.vue';
import About from '../views/About.vue';
import CreateProfile from '../views/CreateProfile.vue';

Vue.use(VueRouter);

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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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
  },
  {
    path: '/new/artist',
    name: 'CreateArtist',
    component: CreateArtist
  },
  {
    path: '/new/coa',
    name: 'CreateCoA',
    component: CreateCoA
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }, 
  {
    path: '/new/profile',
    name: 'CreateProfile',
    component: CreateProfile
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
