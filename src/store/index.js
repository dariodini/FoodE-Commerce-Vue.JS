import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    selectedProduct: null,
    cart: [],
    productList: [],
  },
  mutations: {
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
    },
    ADD_TO_CART(state, { product, quantity }) {
      state.cart.push({ product, quantity });
    },
    REMOVE_FROM_CART(state, product) {
      const cartItemIndex = state.cart.findIndex(item => item.product.name === product.name);
      if (cartItemIndex > -1) {
        state.cart.splice(cartItemIndex, 1);
      }
    },
    UPDATE_CART_ITEM_QUANTITY(state, cartItem) {
      const { product, quantity } = cartItem;
      const cartItemIndex = state.cart.findIndex(item => item.product.name === product.name);
      if (cartItemIndex > -1) {
        if (quantity > 0) {
          state.cart[cartItemIndex].quantity = quantity;
        } else {
          state.cart.splice(cartItemIndex, 1);
        }
      }
    },
    setProductList(state, productList) {
      state.productList = productList;
    },
  },
  actions: {
    selectProduct({ commit }, product) {
      commit('SET_SELECTED_PRODUCT', product);
    },
    addToCart({ commit, state }, { product, quantity }) {
      const cartItem = state.cart.find(item => item.product.name === product.name);
      if (cartItem) {
        const updatedQuantity = cartItem.quantity + quantity;
        commit('UPDATE_CART_ITEM_QUANTITY', { ...cartItem, quantity: updatedQuantity });
      } else {
        commit('ADD_TO_CART', { product, quantity });
      }
    },
    removeFromCart({ commit }, product) {
      commit('REMOVE_FROM_CART', product);
    },
    updateCartItemQuantity({ commit, state }, cartItem) {
      const cartItemIndex = state.cart.findIndex(item => item.product.name === cartItem.product.name);
      if (cartItemIndex > -1) {
        commit('UPDATE_CART_ITEM_QUANTITY', cartItem);
      }
    },
    fetchProductList({ commit }) {
      fetch('https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json')
        .then(response => response.json())
        .then(productList => {
          commit('setProductList', productList);
        });
    },
  },
  getters: {
    selectedProduct(state) {
      return state.selectedProduct;
    },
    cartItems(state) {
      return state.cart.map(item => ({
        ...item.product,
        quantity: item.quantity,
      }));
    },
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    getCartItemQuantity: (state) => (product) => {
      const cartItem = state.cart.find(item => item.product.name === product.name);
      if (cartItem) {
        return cartItem.quantity;
      }
      return 0;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
