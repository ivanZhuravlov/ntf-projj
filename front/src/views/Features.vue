<template>
  <div class="add-royalties">
    <Header />
    <div class="flex items-center flex-col">
      <div class="container px-2 sm:px-3 md:px-4 xs:px-3 flex items-center flex-col max-w-7xl">
        <div class="mt-16 w-full flex px-4">
          <div class="w-full">
            <img src="../assets/images/CoA_example.png">
          </div>
          <div class="w-full flex items-center flex-col">
            <h1 class="text-4xl leading-relaxed mt-20 text-standardGay">Art Fruit Token (AFT)</h1>
            <h2 class="text-3xl leading-relaxed text-lighterOrange">dedicated to physical Artwork</h2>
            <p class="mt-24 font-light text-2xl text-textGray">
              A Certificate of Authenticity THAT INCLUDES A POWERFULL COMBINATION OF NFT & ROYALTIES WHILE IMPROVING YOUR Intellectual Property Rights
            </p>
            <button @click="redirect" class="mt-16 px-6 py-4 bg-orange text-white text-xs leading-tight uppercase rounded-md shadow-md hover:bg-gray-600 hover:shadow-lg transition duration-200 ease-in-out">
              Get started
            </button>
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
  name: 'Features',
  components: {
    Header,
    Footer,
  },
  methods: {
    redirect() {
      this.$router.push(`/login`)
    },
  }
};
</script>
