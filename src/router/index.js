import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Challenges/AllChallenges.vue'
      ),
  },
  {
    path: '/add/challenges',
    name: 'add-challenges',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Challenges/AddChallenge.vue'
      ),
  },
  {
    path: '/profile/:uid',
    name: 'profile-uid',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Profile/UserProfile.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
