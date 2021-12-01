<template>
  <div class="px-3 w-screen py-6 inline-flex flex-row items-center justify-between xs:space-x-0 sm:space-x-0 space-x-12">
      
    <button @click='prev()' id="arrow" class="md:pl-12 lg:pl-12 outline-none text-gray-400 xs:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform hover:scale-150 transition-all delay-100"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>

    <div class="container filter drop-shadow-md max-w-6xl mx-auto px-8 space-y-8 rounded-md bg-white">
      <div v-if=currentToken class="max-w-7xl mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-8">
        <div class="mt-10">
          <router-link :to='`/art/${currentToken.id}`' class="text-gray-800 text-2xl font-bold capitalize leading-relaxed w-10">
            {{ currentToken.data.title }}
          </router-link>
          <h2 class="text-gray-700 font-semibold mb-1">{{ currentToken.artist.lastName }} {{ currentToken.artist.firstName }}</h2>
          <p class="text-gray-700">
            {{ currentToken.data.description }}
          </p>
        </div>
        <img class="max-w-screen-lg h-auto" :src="`https://ipfs.io/ipfs/${currentToken.token_uri}`">
      </div>

    </div>

    <button @click='next()' id="arrow" class="md:pr-12 lg:pr-12 outline-none text-gray-400 xs:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform hover:scale-150 transition-all delay-100"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>

  </div>
</template>

<script>

export default {
  name: 'ArtPreview',
  data() {
    return {
      tokens: [],
      viewedTokenId: 0,
    }
  },
  computed: {
    currentToken() {
      return this.tokens[this.viewedTokenId];
    }
  },
  async mounted() {
    await this.fetchArts();
    console.log(this.tokens.length)
  },
  methods: {
    prev() {
      const prevValue = this.viewedTokenId - 1;
      this.viewedTokenId = prevValue < 0 || !this.tokens[prevValue] ? 0 : prevValue;
      console.log(this.viewedTokenId)
    },
    next() {
      const nextValue = this.viewedTokenId +1;
      this.viewedTokenId = !this.tokens[nextValue] ? 0 : nextValue;
      console.log(this.viewedTokenId)
    },
    async fetchArts() {
      this.tokens = await fetch(`${this.$store.getters.api}/art`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((r) => r.json());
    }
  }
};
</script>