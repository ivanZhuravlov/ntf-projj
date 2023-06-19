<template>
  <div class="add-royalties">
    <Header />
    <div v-if="!loading" class="flex items-center flex-col">
      <div class="container px-7 sm:px-3 md:px-4 xs:px-4 flex items-center flex-col max-w-7xl">

        <div class="w-full flex xs:flex-col justify-between mt-12">
          <p class="font-bold text-darkGray text-lg font-thin text-justify tracking-wide lg:leading-9 lg:text-3xl">
            {{token && token.artist && token.artist.firstName}} {{token && token.artist && token.artist.lastName}}
          </p>
          <i class="font-bold text-darkGray text-lg font-thin text-justify tracking-wide lg:leading-9 lg:text-3xl">
            {{token && token.data && token.data.title}}
          </i>
        </div>

        <div class="w-full flex xs:flex-col justify-between xs:mt-12 mt-20">
          <p class="text-darkGray text-base font-thin text-justify tracking-wide lg:leading-9 lg:text-2xl sm:max-w-xs md:max-w-sm lg:max-w-sm xs:hidden">
            Born 1943. hilla (Greece) live & work in Basel (Switzerland)
          </p>
          <div>
          <p class="text-darkGray text-base font-thin text-justify tracking-wide lg:leading-9 lg:text-2xl sm:max-w-xs md:max-w-sm lg:max-w-sm">
            {{token && token.data && token.data.technical}}
          </p>
          <p class="text-darkGray text-base font-thin text-justify tracking-wide lg:leading-9 lg:text-2xl sm:max-w-xs md:max-w-sm lg:max-w-sm xs:hidden">
            {{token && token.data && token.data.size}}
          </p>

          </div>
        </div>

        <div class="w-full flex xs:flex-col justify-end xs:mt-16 mt-20 xs:hidden">
          <p class="text-darkGray text-base font-thin text-justify tracking-wide lg:leading-9 lg:text-2xl sm:max-w-xs md:max-w-sm lg:max-w-sm">
            Collection from National Art Center hosted by Moon Museum blabla
          </p>
        </div>

        <div class="w-full xs:mt-20 mt-24 xs:hidden">
          <p class="text-darkGray text-base font-thin text-left tracking-wide lg:leading-9 lg:text-2xl">
            {{token && token.data && token.data.description}}
          </p>
        </div>

        <div class="w-full flex justify-start xs:justify-center mt-32 xs:mt-12">
          <div class="flex flex-col items-center">
            <p class=" text-darkGray text-base font-thin text-left tracking-wide lg:leading-9 lg:text-2xl">
              discover full description
            </p>
            <svg class="mt-4 w-40 h-40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect opacity="0.5" width="50" height="50" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_256_967" transform="scale(0.00862069)"/></pattern><image id="image0_256_967" width="116" height="116" xlink:href="data:image/png;base64,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"/></defs></svg>
            <i class="mt-4 text-darkGray text-base font-thin text-left tracking-wide lg:leading-9 lg:text-2xl">
              Art Fruit Token
            </i>
            <i class="text-darkGray text-base font-thin text-left tracking-wide lg:leading-9 lg:text-2xl">
              00000000001
            </i>
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
  name: 'Printables',
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
