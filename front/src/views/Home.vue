<template>
  <div class="flex flex-col items-center">
    <Header />
    <div class="lg:py-24 inline-flex flex-row items-center justify-between xs:space-x-0 sm:space-x-0 space-x-12">
  
    <div class="container max-w-6xl mx-auto px-8 py-8 space-y-10 space-x-1">
      <div class="max-w-7xl mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 pt-6 gap-8">
        <div>
          <h1 class="text-4xl text-center text-black lg:text-5xl font-black leading-relaxed lg:text-left pb-10 tracking-wider">
           Certificate of Authenticity
          </h1>
          <p class="text-gray-800 text-center font-semibold lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <router-link to="/dashboard" tag="button" class="w-full px-3 py-3 text-center mt-4 bg-gray-800 tracking-widest transition duration-150 ease-in-out hover:bg-white rounded border border-gray-800 hover:text-black inline-block uppercase text-white text-sm md:text-base font-bold md:w-2/3 lg:w-2/3 mt-16">Create now</router-link>
        </div>
        <img class="xs:hidden sm:hidden bg-max-w-screen-lg h-auto mt-8 transform rotate-45" src="../assets/infinity.png">
      </div>
    </div>
  </div>

    <div class="flex flex-col items-center lg:flex-row gap-6 mt-36 space-x-4">
    <div class="px-10 mb-3">
      <div class="flex place-content-center pb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h1 class="font-bold mono text-center font-mono uppercase font-sm">Register</h1>
      <p class="font-xs font-thin text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>

    <div class="px-10 mb-3">
      <div class="flex place-content-center pb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <h1 class="font-bold uppercase font-mono text-center font-sm">Verify your art</h1>
      <p class="font-xs font-thin text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>

    <div class="px-10 mt-0">
      <div class="flex place-content-center pb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      
      <h1 class="font-bold uppercase font-mono text-center font-sm">Collect royalties</h1>
      <p class="font-xs font-thin text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>

  
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

export default {
  name: 'Home',
  components: {
    Header,
    Newsletter,
    Footer,
  }
}
</script>
