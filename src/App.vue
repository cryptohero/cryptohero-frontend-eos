<template>
  <div id="app">
    <Header />

    <div class="container main-container">
      <router-view></router-view>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cookie from 'js-cookie';
import { networks } from "./config";
const network = networks['kylin']
const requiredFields = { accounts: [network] }

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  created() {
    const referrer = this.$route.query.ref;
    if (this.$store.state.me !== referrer && referrer) {
      Cookie.set('referrer', referrer, { expires: 356 });
    }
    document.addEventListener('scatterLoaded', (scatterExtension) => {
      console.log('Scatter Plugin Detected, storing scatter to store');
      this.handleScatterLoaded();
    });
  },
  computed: {
  },
  methods: {
    ...mapActions(['initScatter']),
    handleScatterLoaded () {
      const scatter = window.scatter
      this.initScatter(scatter)
      this.requestId()
    },
    async suggestNetworkSetting () {
      try {
        await this.scatter.suggestNetwork(network)
      } catch (error) {
        console.info('User canceled to suggestNetwork')
      }
    },
    async requestId () {
      await this.suggestNetworkSetting()
      const identity = await scatter.getIdentity(requiredFields)
    }
  },

};
</script>

<style>
.main-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
