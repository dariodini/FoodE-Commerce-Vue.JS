<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-4">
        <div class="card-image__container">
          <img :src="product.image" class="img-fluid rounded-start" alt="product image">
        </div>
      </div>
      <div class="col-8">
        <div class="card-body h-100 d-flex flex-column justify-content-between">
          <div class="card-body__content">
            <router-link :to="`/product/${product.name}`" @click="selectProduct(product)">
              <h5 class="card-title">
                {{ product.name }}
              </h5>
            </router-link>
            <p class="card-text card__description">{{ truncateDescription(product.description, 55) }}</p>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div class="input-group input-group-sm me-3">
              <button class="btn btn-outline-secondary" @click="decreaseQuantity(product)">-</button>
              <input type="number" v-model.number="product.quantity" class="form-control text-center" min="1" max="10" disabled readonly>
              <button class="btn btn-outline-secondary" @click="increaseQuantity(product)">+</button>
            </div>
            <span>{{ totalPrice }}€</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmModal from '../components/ConfirmModal.vue';
import { mapActions } from 'vuex';
import { formatPrice } from '../utils';

export default {
  components: {
    ConfirmModal,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['selectProduct']),
    increaseQuantity(product) {
      if (product.quantity < 10) {
        product.quantity++;
        this.saveToStore(product);
      }
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity--;
        this.saveToStore(product);
      }else{
        $('#confirmModal').modal('toggle')
        this.$emit('confirm-delete', product);
      }
    },
    saveToStore(product){
      this.$store.commit('UPDATE_CART_ITEM_QUANTITY', { product, quantity: product.quantity });
    },
    truncateDescription(description, maxLength) {
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
      }
      return description;
    },
  },
  computed: {
    totalPrice() {
      return formatPrice(this.product.price * this.product.quantity);
    },
  }
};
</script>

<style scoped>
.card .row {
  height: 100%;
}

.card .row > * {
  max-height: 100%;
}

.card__description {
  color: #777;
}

.card-image__container {
  height: 100%;
}

img {
  object-fit: cover;
}
</style>
