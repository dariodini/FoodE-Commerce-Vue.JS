<template>
  <nav class="navbar navbar-expand-lg sticky-top mb-3 navbar-shadow bg-white">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="../assets/vegan-food-logo-2.png" class="navbar-logo" alt="Logo" />
      </a>
      <ul class="nav justify-content-center">
          <li class="nav-item">
            <form action="">
              <div class="input-box">
                <input type="text" class="form-control">
                <i class="fa fa-search fa-lg"></i>
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
export default {
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
  },
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
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
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
    top: -4px;
    right: 0;
    width: 20px;
    height: 20px;
    color: black;
    font-weight: 700;
    text-align: end;
  }
</style>
