<template>
  <div class="service">
    <Header />
    <div class="flex justify-center w-full px-4">
      <div class="max-w-4xl grid grid-cols-1 gap-2 place-items-center space-y-8">
        <h1 class="text-gray-800 text-3xl font-bold capitalize leading-relaxed">Service</h1>
        <div class="space-y-4">
          <h2 class="font-semibold capitalize">NFT Package</h2>
          <p class="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div class="space-y-4">
          <h2 class="font-semibold capitalize">Select your service</h2>
          <div class="grid grid-cols-4 gap-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center">
            
            <div v-for='(product, key) in products' :key='key' class="w-44 h-44 inline-flex flex-col items-center space-y-6 border-2 border-gray-400">
              <h1 class="text-gray-800 text-lg capitalize leading-relaxed pt-4">{{ product.name }}</h1>
              <h1 class="text-gray-800 text-lg capitalize leading-relaxed">{{ product.price }}$</h1>
              <a v-if='$store.getters.token' :href='product.link' class="border-gray-400 border-t-2 text-center px-2 py-3 hover:text-white hover:bg-gray-700 w-full bottom-0">
                Select
              </a>
              <router-link v-else to="/login" class="border-gray-400 border-t-2 text-center px-2 py-3 hover:text-white hover:bg-gray-700 w-full bottom-0">
                Select
              </router-link>
            </div>
            

          </div>
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
  name: 'Service',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      products: [],
    }
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.products = await fetch(this.$store.getters.api + '/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((r) => r.json());
    }
  },
};
</script>
