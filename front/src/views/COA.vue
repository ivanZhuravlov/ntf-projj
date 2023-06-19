<template>
  <div class="add-royalties">
    <Header />
    <div v-if="!loading" class="flex items-center flex-col">
      <div class="container px-2 sm:px-3 md:px-4 xs:px-3 flex items-center flex-col max-w-7xl">
        <h1 class="mt-4 text-darkGray text-4xl leading-relaxed text-center">Certificate of Authenticity</h1>
        <p class="mt-4 text-left text-xl tracking-wider text-lightGay xs:text-center">
          This document powered by www.jenko.io is certified by Artist to guarantee the authenticity of the Atrwork described herein. The Artist's E-signature in the public Blockchain assets that he/she has personally inspected, approved, numbered and signed the Artwork.
        </p>

        <div class="flex-row xs:flex-col flex justify-around xs:justify-center w-full mt-16">
          <div class="xs:flex xs:justify-center xs:flex-col">
            <img
              :src="`https://ipfs.io/ipfs/${token.token_uri}`"
              :alt="token.data.title"alt="AFT_home"
              class="sm:max-h-72 md:max-h-96 max-h-116"
            >
            <h1 class="mt-4 text-mediumGray text-2xl leading-relaxed text-center">{{token && token.data && token.data.title}}</h1>
          </div>
          <div class="max-w-2xl ">
            <p class="mt-16 text-mediumGray text-base font-thin text-justify tracking-wide lg:leading-9 lg:text-2xl">
              ARTIST: {{token && token.artist && token.artist.firstName}} {{token && token.artist && token.artist.lastName}}
            </p>
            <p class="mt-4 text-mediumGray text-base font-thin texts-justify tracking-wide lg:text-2xl lg:leading-9">
              TECHNIQUE: {{token && token.data && token.data.technical}}
            </p>
            <p class="mt-4 text-mediumGray text-base font-thin texts-justify tracking-wide lg:text-2xl lg:leading-9">
              DATE: 2022
            </p>
            <p class="mt-4 text-mediumGray text-base font-thin texts-justify tracking-wide lg:text-2xl lg:leading-9">
              DIMENSIONS: {{token && token.data && token.data.size}}
            </p>
            <p class="mt-4 text-mediumGray text-base font-thin texts-justify tracking-wide lg:text-2xl lg:leading-9">
              COPY: ORIGINAL WORK
            </p>

          </div>
        </div>


        <div class="mt-16 w-full">
          <p class="uppercase font-light text-xl text-lightGay xs:text-center">This AFT certificate of authenticity is recorded in polygon blockchain </p>
          <p class="font-light text-xl text-lightGay truncate xs:mt-4">Transaction Hash: <code @click="copyTransactionHash" ref="transaction_hash" class="cursor-pointer text-orange" v-on:focus="$event.target.select()">{{token && token.data && token.data.transaction}}</code></p>
          <p class="font-light text-xl text-lightGay">Block: 14469338</p>
          <p class="font-light text-xl text-lightGay">Timestamp: {{token && token.created_at && new Date(token.created_at)}}</p>

          <p class="mt-6 font-light text-xl text-lightGay truncate"><span class="uppercase">From the artist:</span> <code @click="copyFromTheArtist" ref="from_the_artist" class="cursor-pointer text-orange" v-on:focus="$event.target.select()">{{token && token.artist && token.artist.address}}</code></p>
          <p class="mt-6 font-light text-xl text-lightGay">Atr Fruit Token Number: 000000000000XXX</p>

          <p class="mt-12 uppercase font-light text-xl text-lightGay xs:text-center">All reserved rights associated with the artwork are available in the AFT agreement here</p>
        </div>

        <div class="mt-8 w-full flex xs:flex-col xs:items-center mb-4">
          <div>
            <p class="w-4/5 xs:w-full xs:text-center font-light text-xl text-lightGay tracking-widest">Polygon blockchain is a public record, where anyone can verify the existence of this certificate and check provenance instantly if they have access to this QR code</p>
          </div>
          <div class="xs:mt-8">
            <svg class="w-40 h-40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect opacity="0.5" width="50" height="50" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_256_967" transform="scale(0.00862069)"/></pattern><image id="image0_256_967" width="116" height="116" xlink:href="data:image/png;base64,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"/></defs></svg>
          </div>
        </div>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'COA',
  components: {
    Header,
    Footer,
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.fetchArt(id);
  },

  data () {
    return {
      loading: true,
      token: {}
    }
},
  methods: {
    async fetchArt(id) {
      this.loading = true;
      this.token = await fetch(`${this.$store.getters.api}/art/detail/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((r) => r.json());
      this.loading = false;
    },
    copyToClipboard(message) {
      const clipboardData =
          window.clipboardData ||
          navigator.clipboard;

      clipboardData.writeText(message);
    },
    copyTransactionHash() {
      const value = this.$refs.transaction_hash.innerHTML;
      this.$refs.transaction_hash.focus()

      this.copyToClipboard(value)
      this.copyNotification()
    },
    copyFromTheArtist() {
      const value = this.$refs.from_the_artist.innerHTML;
      this.$refs.from_the_artist.focus()

      this.copyToClipboard(value)
      this.copyNotification()
    },
    copyNotification() {
      this.$toast.open({
        message: 'Copied to clipboard!',
        position: 'top-right',
      });
    },
  },
};
</script>
