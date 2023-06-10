import { createRouter, createWebHashHistory } from 'vue-router';
import HomepageView from '../views/HomepageView.vue';
import CartView from '../views/CartView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: HomepageView,
    props: (route) => ({
      searchQuery: route.query.search || ''
    })
  },
  {
    path: '/product/:name',
    name: 'product-detail',
    component: ProductDetailView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

