// https://vuex.vuejs.org/en/getters.html

// Vuex allows us to define "getters" in the store.
// You can think of them as computed properties for stores.
// Like computed properties, a getter's result is cached based on its dependencies,
// and will only re-evaluate when some of its dependencies have changed.
import Eos from 'eosjs';
import { networks } from '../config';

export default {
  getServerURL: () => 'https://api.cryptohero.pro/',
  getContractNet: () => 'mainnet',
  identity: ({ scatter }) => scatter.identity || null,
  account: ({ scatter }) => scatter.identity.accounts.find(({ blockchain }) => blockchain === 'eos') || null,
  me: ({ scatter }) => scatter.identity.accounts.find(({ blockchain }) => blockchain === 'eos').name || null,
  eos: ({ scatter, network }) => scatter.eos(networks[network], Eos, {}) || null,
};
