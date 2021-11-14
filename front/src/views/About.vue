<template>
  <div class="about">
    <Header />
    <div class="flex justify-center w-full px-4">
      <div class="max-w-4xl grid grid-cols-1 gap-2 place-items-center space-y-8">
        <h1 class="text-gray-800 text-3xl font-bold capitalize leading-relaxed">About Jenko</h1>
        <div class="space-y-4">
          <h2 class="font-semibold capitalize">Services</h2>
          <p class="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>


        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
  components: {
    Header,
    Footer,
  }
};
</script>
