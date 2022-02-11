<template>
  <div class="flex flex-col items-center">
    <Header />
     <h1 class="px-10 mt-40 text-6xl font-black text-black lg:text-7xl text-center max-w-prose mx-60 uppercase tracking-wide mb-28 xs:text-3xl leading-loose">
      The Artist's reserved royalties rights transfer and  <span class="text-orange">AFT</span> Agreement.
    </h1>
    <p class="px-5 text-gray-900 text-center font-semibold text-lg lg:text-left">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <div class="mt-10">
      <ArtPreview />
    </div>
    <router-link to="/dashboard" tag="button" class="items-center px-3 text-white text-center mt-20 bg-orange tracking-widest rounded inline-block uppercase text-sm md:text-base font-bold md:w-2/3 lg:w-1/6 h-16 sm:w-3/4 xs:w-3/4 hover:transition ease-out duration-200 transform hover:scale-105 hover:bg-black xs:mt-10">Create now!</router-link>    <div class="mb-10 lg:px-20 lg:my-20">
      <Introduction />
    </div>
    <div class="filter drop-shadow-md flex w-screen-2/3 py-3 px-3 flex xs:flex-col-reverse sm:flex-col-reverse mt-10">
      <Newsletter />
    </div>
    <Footer class="w-full mt-10" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Newsletter from '@/components/Newsletter.vue'
import ArtPreview from '@/components/ArtPreview.vue'
import Introduction from '../components/Introduction.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Newsletter,
    Footer,
    ArtPreview,
    Introduction,
  }
}
</script>
