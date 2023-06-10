<template>
  <div v-if="productList.length > 0">
    <ProductList :products="productList" />
  </div>
  <div v-else>
    <h6 class="alert alert-primary">
      There are no products containing what you are looking for..
    </h6>
  </div>
</template>

<script>
  import ProductList from '../components/ProductList';
  import { mapState, mapActions } from 'vuex';

  export default {
    components: {
      ProductList,
    },
    computed: {
      ...mapState(['productList']),
    },
    created() {
      if (this.productList.length == 0){
        this.fetchProductList();
      }
    },
    methods: {
      ...mapActions(['fetchProductList']),
    },
  };
</script>
