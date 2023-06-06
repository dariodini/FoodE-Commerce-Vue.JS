<template>
  <h1 class="my-4">Available products:</h1>
  <div class="row gy-3">
    <div class="col-lg-3 col-md-4 col-sm-6" v-for="product in products" :key="product.id">
      <RouterLink :to="{name: 'product-detail', params: { name: product.name } }" @click="selectProduct(product)" class="card product-card">
        <img :src="product.image" alt="Product Image" class="card-img-top product-card__image">
        <div class="card-body product-card__content">
          <h3 class="card-title product-card__title">{{ product.name }}</h3>
          <span class="card-text product-card__price">
            {{ formatPrice(product.price) }}€
          </span>
          <p class="card-text product-card__description">
            {{ product.description }}
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
  import { formatPrice } from '../utils';
  import { mapActions } from 'vuex';

  export default {
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    methods: {
      ...mapActions(['selectProduct']),
      formatPrice,
    },
  };
</script>

<style scoped>
  .product-card {
    height: 100%;
  }

  .product-card__image {
    height: 200px;
    object-fit: cover;
  }

  .product-card__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-card__title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .product-card__price {
    font-weight: bold;
  }

  .product-card__description {
    color: #777;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
