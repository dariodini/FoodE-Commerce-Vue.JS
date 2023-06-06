<template>
  <div>
    <ProductList :products="productList"/>
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
      if (! this.productList){
        this.fetchProductList();
      }
    },
    methods: {
      ...mapActions(['fetchProductList']),
    },
  };
</script>
