// https://vuex.vuejs.org/en/actions.html

// Actions are similar to mutations,
// the differences being that:
// Instead of mutating the state, actions commit mutations.
// Actions can contain arbitrary asynchronous operations.

// Action handlers receive a context object
// which exposes the same set of methods/properties on the store instance,
// so you can call context.commit to commit a mutation,
// or access the state and getters via context.state and context.getters.

// DO NOT directly modify the state in actions.
// Please use commit() to update the state.

// import * as types from './mutation-types';
import * as api from '@/api';

export default {
  initScatter({ commit }, scatter) {
    commit('setScatter', scatter);
  },
  async initLocale({ commit }) {
    const locale = await api.getLocale();
    commit('setLocale', locale);
  },
  async setLocale({ commit }, locale) {
    await api.setLocale(locale);
    commit('setLocale', locale);
  }
};
