<template>
  <div class="art">
    <Header />
    <div class=" bg-gray-50 mt-10 m-3 px-6 pb-5 rounded filter shadow-md container max-w-7xl sm:px-4 xs:px-3 mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 pt-6 gap-8 xs:gap-7 xs:justify-items-center">
      <img class="max-w-screen-lg h-auto" :src="`https://ipfs.io/ipfs/${token.token_uri}`">
 
      <div>
        <h1 class="text-gray-800 text-3xl font-bold capitalize leading-relaxed xs:text-center">{{ token.data.title }}</h1>
        <h2 class="text-gray-700 capitalize xs:text-center font-semibold">{{ token.artist.lasName }} {{ token.artist.firstName }}</h2>
        <p class="text-gray-700 xs:text-center">
          {{ token.data.description }}
        </p>

        <div class="grid grid-cols-2 mt-12 bg-white rounded-md xs:space-x-2 divide-x filter drop-shadow px-3">
          <div class="space-y-4 space-y-2 px-2 my-3">
            <div v-if='token.data.artPieceId' class="uppercase tracking-widest text-sm xs:text-xs">Art piece: {{ token.data.artPieceId }}</div>
            <div v-if='token.data.createdAt' class="uppercase tracking-widest text-sm xs:text-xs">Created At: {{ new Date(token.data.createdAt).toISOString().split('T')[0] }}</div>
            <div v-if='token.data.size' class="uppercase tracking-widest text-sm xs:text-xs">Size: {{ token.data.size }}</div>
            <div v-if='token.data.material' class="uppercase tracking-widest text-sm xs:text-xs">Material: {{ token.data.material }}</div>
            <div v-if='token.data.technical' class="uppercase tracking-widest text-sm xs:text-xs">Technical: {{ token.data.technical}}</div>
            <div v-if='token.data.movment' class="uppercase tracking-widest text-sm xs:text-xs">Movment: {{ token.data.movment}}</div>
            <div v-if='token.data.movment' class="uppercase tracking-widest text-sm xs:text-xs">Movment: {{ token.data.movment}}</div>
          </div>
          <div class="space-y-4 space-y-2 pl-5 my-3">
            <div class="uppercase tracking-widest text-sm xs:text-xs">COA Transaction</div>
            <a :href="'https://etherscan.io/tx/' + token.data.transaction" target="_blank" class="text-xs underline font-mono hover:text-blue-300">{{ clean(token.data.transaction) }}</a>
            <div class=" uppercase tracking-widest text-sm xs:text-xs">Owner Address</div>
            <a :href="'https://etherscan.io/address/' + token.data.artistAddress" target="_blank" class="text-xs font-mono underline hover:text-blue-300">{{ clean(token.data.artistAddress) }}</a>
          </div>
        </div>
      </div>
      
      <div class="xs:border-r-0 border-r-2 xs:text-center mt-10">
        <h3 class="text-gray-800 text-2xl lg:text-2xl font-bold mb-4 md:mb-6 ">Certificate of Authenticity</h3>
        <p class="text-gray-700 md:text-md text-sm mr-20 xs:mx-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div class="xs:bg-white filter drop-shadow rounded-md w-full py-3 px-6 xs:pb-6">
        <h4 class="text-md font-semibold text-gray-700 ">Royalties Applied</h4>
        <div class=" mt-5 flex flex-cols space-x-10">
          <div v-if='token.data.royalties'>
            <div v-if='token.data.royalties.roylatiesArtist' class="uppercase tracking-widest text-xs  ">Artist: {{ token.data.royalties.roylatiesArtist }} %</div>
            <div v-if='token.data.royalties.roylatiesGallery' class="uppercase tracking-widest text-xs ">Gallery: {{ token.data.royalties.roylatiesGallery }}%</div>
            <div v-if='token.data.royalties.roylatiesCollector0' class="uppercase tracking-widest text-xs">First Collector: {{ token.data.royalties.roylatiesCollector0 }} %</div> 
            <div v-if='token.data.royalties.roylatiesCollector1' class=" uppercase tracking-widest text-xs">Second Collector: {{ token.data.royalties.roylatiesCollector1 }} %</div>
            <div v-if='token.data.royalties.roylatiesCollector2' class="uppercase tracking-widest text-xs">Third Collector: {{ token.data.royalties.roylatiesCollector2 }} %</div>
            <div v-if='token.data.royalties.roylatiesCollectorX' class="uppercase tracking-widest text-xs">X Collector: {{ token.data.royalties.roylatiesCollectorX }} %</div>
            <div class="uppercase tracking-widest text-xs">Jenko: 3%</div>
          </div>
          <div v-else-if='$store.getters.isArtist && $store.getters.userId === token.user_id' class="h-full">
            <p class="text-sm text-gray-500 pb-3 mb-6">Jenko: 3%</p> 
            <router-link :to='`/royalties/${token.id}`' class="mt-6 my-10 bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-gray-600 px-6 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
            Add Royalties
            </router-link>
          </div>
          <div v-else>
            <p class="text-sm text-gray-500 pb-3 mb-6">Jenko: 3%</p>
          </div>
        </div>           
      </div>
        <div class="text-right col-span-full justify-center flex pt-10">
          <button onclick="window.print();" class="no-print mx-2 my-2 mr-10  bg-gray-100 transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-gray-300 text-gray-600 px-6 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 xs:mx-2">
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
      token: { }  
    }
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.fetchArt(id);
  },
  methods: {
    async fetchArt(id) {
      this.token = await fetch(`${this.$store.getters.api}/art/detail/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((r) => r.json());
    },
    clean(longText) {
      return longText ? longText.slice(0, 8) + ' ... ' + longText.slice(-8) : '';
    },
  }
}
</script>
