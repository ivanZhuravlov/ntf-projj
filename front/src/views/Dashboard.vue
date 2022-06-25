<template>
  <div class="dashboard space-y-12">
    <Header v-on:searchUpdated="searchArt" />

    <div v-if='certificates.length'>
      <div class="container max-w-7xl sm:px-4 xs:px-2 mx-auto grid lg:grid-cols-4 grid-cols-2 pt-6 gap-8">
        <div v-for="certificate in certificates" :key='certificate.id' class=" hover:shadow-md rounded-md">
          <Preview :certificate="certificate" />
        </div>
      </div> 

    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Preview from '@/components/Preview.vue';
import Subscription from '@/components/Subscription.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
    Subscription,
    Preview
  },
  data() {
    return {
      user: null,
      artist: null,
      subscriptions: [],
      certificates: [],
    }
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const [{user, artist, subscriptions}] = await Promise.all([
        fetch(this.$store.getters.api + '/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer
          }
        }).then((r) => r.json()),
        this.searchArt()
      ]);

      this.user = user;
      this.artist = artist;
      this.subscriptions = subscriptions;
    },
    certificatesCount(subscriptionId) {
      return this.certificates.filter(
        (certificate) => certificate.subscription_id === subscriptionId
      ).length;
    },
    async searchArt() {
      const url = `${this.$store.getters.api}/art/search/${this.$store.getters.search ?? ''}`;
      const { certificates } = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.bearer
        }
      }).then((r) => r.json())

      this.certificates = [{id: 'new'}, ...certificates];
    }
  }
}
</script>
