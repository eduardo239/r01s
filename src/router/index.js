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
    path: '/challenge/:cid',
    name: 'challenge-by-id',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Challenges/ChallengeById.vue'
      ),
  },
  {
    path: '/challenge-description/:cid',
    name: 'challenge-description',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Challenges/ChallengeDescription.vue'
      ),
  },
  {
    path: '/profile/:uid',
    name: 'profile-uid',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/User/UserProfile.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Auth/AuthHome.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
