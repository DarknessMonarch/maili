import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SupportView from '@/views/SupportView.vue';
import PolicyView from '@/views/PolicyView.vue';
import DisclaimerView from '@/views/DisclaimerView.vue';
import TermsView from '@/views/TermsView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: "Maili - Home",
    }
  },


  {
    path: '/support',
    name: 'Support',
    component: SupportView,
    meta: {
      title: "Maili - Support",
    }
  },
  {
    path: '/policy',
    name: 'Policy',
    component: PolicyView,
    meta: { 
      title: "Maili - Privacy Policy",
    }
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: DisclaimerView,
    meta: {
      title: "Maili - Disclaimer",
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: TermsView,
    meta: {
      title: "Maili - Terms and Conditions",
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      title: "404 - Page not found",
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const dynamicTitleGuard = (to, from, next) => {
  document.title = to.meta.title || 'Maili - Send many emails faster ';
  next();
};


router.beforeEach(dynamicTitleGuard);

export default router;
