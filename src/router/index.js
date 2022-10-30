import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserHome from '../views/User/UserHome.vue';
import UserStats from '../views/User/UserStats.vue';
import UserEdit from '../views/User/UserEdit.vue';

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
        /* webpackChunkName: "about" */ '../views/Challenges/Admin/AddChallenge.vue'
      ),
  },
  {
    path: '/all/challenges',
    name: 'all-challenges',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/Challenges/Admin/AllChallenges.vue'
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
    name: 'user-stats',
    component: UserHome,
    children: [
      {
        path: '/profile/:uid/edit',
        name: 'user-edit',
        component: UserEdit,
      },
      {
        path: '/profile/:uid/stats',
        name: 'user-stats',
        component: UserStats,
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Auth/AuthHome.vue'),
  },
  {
    path: '/*',
    component: 404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
