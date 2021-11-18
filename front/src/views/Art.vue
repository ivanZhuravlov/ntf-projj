<template>
  <div class="art">
    <Header />
    <div class="container max-w-7xl sm:px-4 xs:px-2 mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 pt-6 gap-8">
      <img class="max-w-screen-lg h-auto" :src="`https://ipfs.io/ipfs/${token.token_uri}`">
 
      <div>
        <h1 class="text-gray-800 text-3xl font-bold capitalize leading-relaxed">{{ token.data.title }}</h1>
        <h2 class="text-gray-500 capitalize">{{ token.artist.lastName }} {{ token.artist.firstName }}</h2>
        <p class="text-gray-700">
          {{ token.data.description }}
        </p>

        <div class="grid grid-cols-2 mt-12">
          <div class="space-y-2">
            <div v-if='token.data.artPieceId' class="uppercase">Art piece: {{ token.data.artPieceId }}</div>
            <div v-if='token.data.size' class="uppercase">Size: {{ token.data.size }}</div>
            <div v-if='token.data.material' class="uppercase">Material: {{ token.data.material }}</div>
            <div v-if='token.data.technical' class="uppercase">Technical: {{ token.data.technical}}</div>
            <div v-if='token.data.movment' class="uppercase">Movment: {{ token.data.movment}}</div>
          </div>
          <div class="space-y-4">
            <div class="text-gray-500 uppercase">COA Transaction</div>
            <a :href="'https://etherscan.io/tx/' + token.data.transaction" target="_blank" class="underline hover:text-blue-700">{{ clean(token.data.transaction) }}</a>
            <div class="text-gray-500 uppercase">Owner Address</div>
            <a :href="'https://etherscan.io/address/' + token.data.artistAddress" target="_blank" class="underline hover:text-blue-700">{{ clean(token.data.artistAddress) }}</a>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-gray-800 text-2xl lg:text-3xl font-bold mb-4 md:mb-6">Research</h3>
        <p class="text-gray-700 md:text-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div class="text-right">
        <button class="mx-2 my-2 bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-gray-600 px-6 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
          Download certificate
        </button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Art',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      token: {}
    }
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.fetchArt(id);
  },
  methods: {
    async fetchArt(id) {
      this.token = await fetch(`${this.$store.getters.api}/art/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((r) => r.json());
    },
    clean(longText) {
      return longText.slice(0, 8) + ' ... ' + longText.slice(-8);
    }
  }
}
</script>
