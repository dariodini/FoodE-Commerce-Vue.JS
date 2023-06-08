<template>
  <nav class="navbar navbar-expand-lg sticky-top mb-3 navbar-shadow bg-white">
    <div class="container-fluid">
      <a class="navbar-brand" href="" @click="resetSearchQuery">
        <img src="../assets/vegan-food-logo-2.png" class="navbar-logo" alt="Logo" />
      </a>
      <ul class="nav justify-content-center flex-grow-1">
          <li class="nav-item flex-grow-1">
            <form @submit="searchProducts" id="searchForm">
              <div class="input-box">
                <input type="text" class="form-control" v-model="searchQuery" name="searchInput" placeholder="Search products..." autocomplete="off">
                <button type="submit" class="btn" id="formSubmitBtn">
                  <i class="fa fa-search fa-lg"></i>
                </button>
              </div>
            </form>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link pe-0">
              <i class="fas fa-shopping-cart fa-2x"></i>
              <span class="cart-items-count" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
            </router-link>
          </li>
        </ul>
    </div>
  </nav>
</template>

<script>
import { router } from '../router/index.js';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
  },
  methods: {
    ...mapActions(['setSearchQuery', 'fetchProductList']),
    searchProducts(event) {
      this.setSearchQuery(this.searchQuery);
      this.backHome(event);
    },
    resetSearchQuery(event){
      this.setSearchQuery('');
      this.searchQuery = '';
      this.backHome(event);
    },
    backHome(event){
      event.preventDefault();
      this.fetchProductList();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
  .navbar-shadow{
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }

  .navbar-logo {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .input-box{
    position: relative;
  }

  .fa-shopping-cart{
    color: #71A737;
  }

  .input-box i {
    color:#71A737;
  }

  .form-control{
    height: 50px;
    background-color:#eeeeee69;
    border: 1px solid #71A737;
    padding-right: 40px;
  }

  .form-control:focus{
    background-color: #eeeeee69;
    box-shadow: none;
    border-color: #eee;
  }
  .fa-search::before{
    width: 20px;
  }

  .nav-link{
    position: relative;
  }
  .cart-items-count{
    position: absolute;
    top: -3px;
    right: -3px;
    width: 23px;
    height: 23px;
    color: #879B7D;
    font-weight: 700;
    text-align: end;
    text-align: center;

    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.47);
  }
  #formSubmitBtn{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  input[name="searchInput"]::placeholder{
    opacity: .5;
  }
</style>
