<template>
  <div class="flex flex-col space-y-4 border border-8 border-gray-300 rounded-md py-6 bg-white px-8 filter">
    <h1 class="text-gray-800 tracking-widest uppercase font-semibold leading-relaxed">Newsletters</h1>
    <p class="text-sm text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
    </p>
    <div class="flex w-full items-center space-x-2">
      <input class="w-full text-sm md:w-64 text-gray-600 border-b-2 border-gray-500 outline-none lg:w-64" type="text" placeholder="Your email address">
      <button class="hover:transition ease-out duration-200 transform hover:scale-110"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Newsletter",
  };
</script>