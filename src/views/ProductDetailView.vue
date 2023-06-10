<template>
  <div class="container">
    <h1 class="my-4">Product detail</h1>
    <div v-if="product" class="card mb-4">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="product.image" alt="Product Image" class="card-img">
        </div>
        <div class="col-md-8">
          <div class="card-body h-100">
            <div class="card-body__content">
              <h3 class="card-title">{{ product.name }}</h3>
              <p class="card-text">{{ product.description }}</p>
              <span class="me-3"><strong>{{ formatPrice(product.price) }}€</strong></span>

              <div class="input-group mt-3">
                <label for="quantity" class="input-group-text me-3 rounded">Quantity:</label>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary rounded-0 rounded-start" @click="decreaseQuantity">-</button>
                </div>
                <input type="number" id="quantity" v-model="quantity" class="form-control text-center" min="1" max="10" disabled readonly>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary rounded-0 rounded-end" @click="increaseQuantity">+</button>
                </div>
              </div>
            </div>
            <div class="card-body__actions">
              <button v-if="quantity>0 && isQuantityChanged" @click="updateCart" class="btn btn-primary w-100 mt-3">
                {{ isProductInCart ? 'Update quantity' : 'Add to cart' }}
                <span v-if="totalCost">({{ formatPrice(totalCost) }}€)</span>
                <span v-else>({{ formatPrice(product.price) }}€)</span>
              </button>
              <button v-else-if="quantity>0 && ! isQuantityChanged" @click="removeProduct" class="btn btn-danger w-100 mt-3">
                Remove product
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatPrice } from '../utils'
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        quantity: 1,
      };
    },
    created() {
      const cartItemQuantity = this.$store.getters.getCartItemQuantity(this.product);
      this.quantity = cartItemQuantity;
    },
    computed: {
      product() {
        return this.$store.getters.selectedProduct;
      },
      totalCost() {
        if (this.product) {
          return this.product.price * this.quantity;
        }
        return 0;
      },
      isProductInCart() {
        const cartItemQuantity = this.$store.getters.getCartItemQuantity(this.product);
        return cartItemQuantity > 0;
      },
      isQuantityChanged(){
        const cartItemQuantity = this.$store.getters.getCartItemQuantity(this.product);
        if (cartItemQuantity != this.quantity ) {
          return true;
        }
        return false
      }
    },
    methods: {
      formatPrice,
      ...mapActions(['updateCartItemQuantity']),
      updateCart() {
        const cartItemQuantity = this.$store.getters.getCartItemQuantity(this.product);

        const item = {
          product: this.product,
          quantity: this.quantity,
        };

        if(cartItemQuantity !== 0){
          this.updateCartItemQuantity(item);
        }else{
          this.$store.dispatch('addToCart', item);
        }
      },
      increaseQuantity() {
        if (this.quantity < 10) {
          this.quantity++;
        }
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      removeProduct() {
        this.$store.dispatch('removeFromCart', this.product);
        this.quantity = 0
      }
    },
  };
</script>

<style scoped>
  .card-img {
    height: 300px;
    object-fit: cover;
  }
</style>
