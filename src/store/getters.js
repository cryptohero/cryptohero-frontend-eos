// https://vuex.vuejs.org/en/getters.html

// Vuex allows us to define "getters" in the store.
// You can think of them as computed properties for stores.
// Like computed properties, a getter's result is cached based on its dependencies,
// and will only re-evaluate when some of its dependencies have changed.

export default {
  getServerURL: () => 'https://api.cryptohero.pro/',
  getContractNet: () => 'mainnet',
  accounts: state => state.identity.accounts.find(({ blockchain }) => blockchain === 'eos') || null
};
