import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    selectedProduct: null,
    productList: [],
  },
  mutations: {
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
    },
    setProductList(state, productList) {
      state.productList = productList;
    },
  },
  actions: {
    selectProduct({ commit }, product) {
      commit('SET_SELECTED_PRODUCT', product);
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
  },
  plugins: [createPersistedState()],
});

export default store;
