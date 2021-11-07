<template>
  <div class="inline-flex flex-row items-center justify-between xs:space-x-0 sm:space-x-0 space-x-12">
      
    <button id="arrow" class="pl-12 outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform hover:scale-150 transition-all delay-100"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>

    <div class="container max-w-6xl mx-auto px-8 space-y-8">
      <div class="container max-w-7xl mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 pt-6 gap-8">
   
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
        </div>
        <img class="max-w-screen-lg h-auto" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg">
      </div>

      <div class="justify-between flex w-full items-center">
        <Newsletter />
        <div>
          <button class="mx-2 my-2 bg-gray-600 transition duration-150 ease-in-out hover:bg-gray-700 rounded border border-gray-300 text-gray-100 px-6 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
            Create now
          </button>
        </div>
      </div>
    </div>

    <button id="arrow" class="pr-12 outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform hover:scale-150 transition-all delay-100"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>

  </div>
</template>

<script>
import Newsletter from '@/components/Newsletter.vue'

export default {
  name: 'ArtPreview',
  components: {
    Newsletter
  }
};
</script>
