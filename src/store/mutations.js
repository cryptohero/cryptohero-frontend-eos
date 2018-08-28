// https://vuex.vuejs.org/en/mutations.html
import { networks } from "../config";


import Vue from 'vue';
import Eos from "eosjs";

export default {
  setLocale(state, locale) {
    state.locale = locale;
  },
  SET_ME(state, me) {
    state.me = me;
  },
  setScatter(state, scatter,) {
    state.scatter = scatter;
    // const networkName = state.network || 'mainnet'
    // const network = networks[networkName]
    // state.eos = scatter.eos(network, Eos, {});
    // state.identity = scatter.identity;
    // state.account = scatter.identity.accounts.find(({ blockchain }) => blockchain === 'eos');
  },
  setIdentity(state, identity) {
    state.identity = identity;
  },
  SET_SIGN_IN_ERROR(state, error) {
    state.signInError = error;
  },
  SET_ITEM(state, { id, item }) {
    Vue.set(state.items, id, item);
  },
  SET_AD(state, { id, ad }) {
    Vue.set(state.ads, id, ad);
  },
  my_card(state, cards) {
    state.set(state.myCards, cards);
  },
  /* Examples:
  [types.ADD_TO_CART](state, payload) {
    state.cart.push(payload);
  },
  // this.$store.commit(types.ADD_TO_CART, product);

  increment(state) {
    state.count++;
  },
  // this.$store.commit('increment');
  */
};
