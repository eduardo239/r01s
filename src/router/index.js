import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  // {
  //   path: '/auth',
  //   name: 'auth',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/Auth/AuthHome.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
