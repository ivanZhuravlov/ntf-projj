<template>
  <div class="dashboard">
    <Header />
    Holà
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      user: null,
      artist: null,
      subscriptions: [],
      certifications: [],
    }
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const response = await fetch(this.$store.getters.api + '/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.bearer
        }
      }).then((r) => r.json());
      this.user = response.user;
      this.artist = response.artist;
      this.subscriptions = response.subscriptions;
      this.certifications = response.certifications;
    },
  }
}
</script>
