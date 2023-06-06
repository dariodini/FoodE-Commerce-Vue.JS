import { createRouter, createWebHashHistory } from 'vue-router';
import Homepage from '../views/Homepage.vue';
import ProductDetail from '../components/ProductDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/product/:name',
    name: 'product-detail',
    component: ProductDetail,
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

