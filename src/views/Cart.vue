<template>
  <h1 class="my-4">Cart</h1>
  <div v-if="cartItems.length > 0">
    <div class="row">
      <div v-for="(item, index) in cartItems" :key="index" class="product col-lg-6 col-md-6 col-sm-12">
        <ProductCart :product="item" @confirm-delete="selectProduct"></ProductCart>
      </div>
      <ConfirmModal :product="selectedProduct" @deletion-confirmed="removeProduct"/>
    </div>
    <hr>
    <button class="btn btn-lg btn-primary w-100 shadow">Total purchase <br> {{ cartTotal }}€</button>
  </div>
  <div v-else>
    <p>Your cart is empty.</p>
  </div>
</template>

<script>
  import ProductCart from '../components/ProductCart.vue';
  import ConfirmModal from '../components/ConfirmModal.vue';

  export default {
    components: {
      ProductCart,
      ConfirmModal,
    },
    data() {
      return {
        selectedProduct: {name: ''},
      }
    },
    computed: {
      cartItems() {
        return this.$store.getters.cartItems;
      },
      cartTotal(){
        return this.$store.getters.cartTotal.toFixed(2);
      }
    },
    methods: {
      increaseQuantity(item) {
        if (item.quantity < 10) {
          item.quantity++;
        }
      },
      decreaseQuantity(item) {
        if (item.quantity > 1) {
          item.quantity--;
        }
      },
      selectProduct(product){
        this.selectedProduct = product;
        $('#confirmModal').modal('toggle');
      },
      removeProduct(product){
        this.$store.dispatch('removeFromCart', product);
      }
    },
  };
</script>

<style scoped>
  .row .product:last-child {
    margin-bottom: 0;
  }
</style>
