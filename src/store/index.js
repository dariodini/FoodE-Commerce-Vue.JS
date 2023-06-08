import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    selectedProduct: null,
    cart: [],
    productList: [],
    searchQuery: '',
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
    SET_PRODUCT_LIST(state, productList) {
      state.productList = productList;
    },
    SET_SEARCH_QUERY(state, data) {
      state.searchQuery = data;
    }
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
    fetchProductList({ commit, state }) {
      fetch('https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json')
        .then(response => response.json())
        .then(productList => {
          if (state.searchQuery) {
            const filteredProducts = productList.filter(product =>
              product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
            commit('SET_PRODUCT_LIST', filteredProducts);
          } else {
            commit('SET_PRODUCT_LIST', productList);
          }
        });
    },
    setSearchQuery({ commit }, data) {
      commit('SET_SEARCH_QUERY', data);
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
