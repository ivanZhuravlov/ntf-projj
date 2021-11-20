<template>
  <div class="wallet space-y-12">
    <Header />
    <Wallet :address='address' :words='words' />
    <Footer class="w-full" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Wallet from '@/components/Wallet.vue';

export default {
  name: 'GenerateWallet',
  components: {
    Header,
    Wallet,
    Footer,
  },
  data() {
    return {
      words: null,
      address: null
    }
  },
  async mounted() {
    await this.fetchWallet();
  },
  methods: {
    async fetchWallet() {
      const response = await fetch(this.$store.getters.api + '/wallet', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.bearer
        }
      }).then((r) => r.json());
      this.address = response.address;
      this.words = response.words;
    },
  }
}
</script>
