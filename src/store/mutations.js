// https://vuex.vuejs.org/en/mutations.html


import Vue from 'vue';

export default {
  setLocale(state, locale) {
    state.locale = locale;
  },
  // SET_ME(state, me) {
  //   state.me = me;
  // },
  setScatter(state, scatter) {
    state.scatter = scatter;
    // state.eos = scatter.eos(network, Eos, {});
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
};
