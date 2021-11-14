import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import Service from '../views/Service.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Art from '../views/Art.vue';
import CreateArtist from '../views/CreateArtist.vue';
import Dashboard from '../views/Dashboard.vue';
import CreateCoA from '../views/CreateCoA.vue';
import store from '../store';

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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new/artist',
    name: 'CreateArtist',
    component: CreateArtist,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new/coa',
    name: 'CreateCoA',
    component: CreateCoA,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(['Login', 'Register'].includes(to.name) && null !== store.getters.token) {
    next('/');
    return ;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.token) {
      next('/login');
      return;
    }    
  }

  next();
});

export default router;
