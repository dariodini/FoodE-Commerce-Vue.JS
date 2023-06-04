import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    selectedProduct: null,
  },
  mutations: {
    SET_SELECTED_PRODUCT(state, product) {
      state.selectedProduct = product;
    },
  },
  actions: {
    selectProduct({ commit }, product) {
      commit('SET_SELECTED_PRODUCT', product);
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
