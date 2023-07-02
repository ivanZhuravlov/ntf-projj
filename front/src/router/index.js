import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Art from '../views/Art.vue';
import CreateArtist from '../views/CreateArtist.vue';
import Dashboard from '../views/Dashboard.vue';
import GenerateWallet from '../views/GenerateWallet.vue';
import CreateCoA from '../views/CreateCoA.vue';
import About from '../views/About.vue';
import RenewedAbout from '../views/RenewedAbout.vue';
import Kyc from '../views/Kyc.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import EditProfile from '../views/EditProfile.vue';
import SetRoyalties from '../views/SetRoyalties.vue';
import store from '../store';
import COA from '@/views/COA.vue';
import Printables from '@/views/Printables.vue';
import RenewedPricing from "@/views/RenewedPricing";
import RenewedDashboard from "@/views/RenewedDashboard";
import CreateAFT from '@/views/CreateAFT.vue';
import Features from '@/views/Features.vue';
import Portfolio from '@/views/Portfolio.vue';

Vue.use(VueRouter);

// TODO reset-password
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
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: RenewedPricing
  },
  {
    path: '/art/:id',
    name: 'Art',
    component: Art
  },
  {
    path: '/artworks',
    name: 'Dashboard',
    component: RenewedDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new/wallet',
    name: 'GenerateWallet',
    component: GenerateWallet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new/artist',
    name: 'CreateArtist',
    component: CreateArtist,
    meta: {
      requiresAuth: true,
      requiresArtist: true
    }
  },
  {
    path: '/new/coa',
    name: 'CreateCoA',
    component: CreateCoA,
    meta: {
      requiresAuth: true,
      requiresArtist: true
    }
  },
  {
    path: '/new/aft',
    name: 'CreateAFT',
    component: CreateAFT,
    meta: {
      requiresAuth: true,
      // requiresArtist: true
    }
  },
  {
    path: '/about',
    name: 'RenewedAbout',
    component: RenewedAbout
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/kyc',
    name: 'Kyc',
    component: Kyc,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/royalties/:id',
    name: 'SetRoyalties',
    component: SetRoyalties,
    meta: {
      requiresAuth: true,
      requiresArtist: true
    }
  },
  {
    path: '/info/coa/:id',
    name: 'COA',
    component: COA,
  },
  {
    path: '/info/printables/:id',
    name: 'Printables',
    component: Printables,
  }
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  root: '/',
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
      return ;
    }
  }

  if (to.matched.some(record => record.meta.requiresArtist)) {
    if (!store.getters.isArtist) {
      next('/');
      return ;
    }
  }

  next();
});

export default router;
