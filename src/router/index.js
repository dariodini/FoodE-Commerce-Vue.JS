import { createRouter, createWebHashHistory } from 'vue-router';
import Homepage from '../views/Homepage.vue';
import Cart from '../views/Cart.vue';
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
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

