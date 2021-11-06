<template>
  <div class="hom">
    <div class="container max-w-7xl sm:px-4 xs:px-2 mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 pt-6 gap-8">
      <img class="max-w-screen-lg h-auto" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg">
 
      <div class="">
        <h1 class="text-gray-800 text-3xl font-bold capitalize leading-relaxed">Name of art</h1>
        <h2 class="text-gray-500 capitalize">Artist name</h2>
        <p class="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div class="grid grid-cols-2 mt-12">
          <div class="space-y-2">
            <div>2010</div>
            <div class="uppercase">120 cm x 100 cm</div>
            <div class="uppercase">oil on canvas</div>
            <div class="uppercase">piece unique</div>
          </div>
          <div class="space-y-4">
            <div class="text-gray-500 uppercase">NFT Address</div>
            <a href="#" class="underline hover:text-blue-700">0xdc9606795656c...80413ca</a>
            <div class="text-gray-500 uppercase">Owner Address</div>
            <a href="#" class="underline hover:text-blue-700">0xdc9606795656c...80413ca</a>
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
import Footer from '@/components/Footer.vue'

export default {
  name: 'Art',
  components: {
    Footer
  },
  mounted() {
    const { id } = this.$route.params;
  }
}
</script>
