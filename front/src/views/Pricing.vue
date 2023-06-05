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
          <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>
          <div class="grid grid-cols-4 gap-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center select-none">
            
            <div v-for='(product, key) in products' :key='key' class="w-44 h-full inline-flex flex-col items-center space-y-6 border-2 border-gray-900 rounded-lg">
              <h1 class="text-gray-800 text-lg capitalize leading-relaxed pt-4">{{ product.name }}</h1>
              <h2 class="text-gray-800 text-lg capitalize leading-relaxed">{{ product.price }}$</h2>
              <p class="w-full break-words px-2">{{ product.description }}</p>
              <button v-if='!product.price' @click='freeProduct()' class="border-gray-900 border-t-2 text-center px-2 py-3 hover:text-black hover:bg-orange w-full bottom-0 cursor-pointer">
                Select
              </button>
              <a v-else-if='product.price && $store.getters.token' :href='product.link' class="border-gray-900 border-t-2 text-center px-2 py-3 hover:text-black hover:bg-orange w-full bottom-0 cursor-pointer">
                Select
              </a>
              <router-link v-else to="/login" class="border-gray-900 border-t-2 text-center px-2 py-3 hover:text-black hover:bg-orange w-full bottom-0 cursor-pointer">
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
      error: null,
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
    },
    async freeProduct() {
      if(!this.$store.getters.bearer) {
        this.$router.push('/register');
        return ;
      }

      try {
        const response = await fetch(this.$store.getters.api + '/products/free', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer
          }
        });

        if(response.status !== 200) {
          throw await response.text();
        }

      } catch(error) {
        this.error = error;
        return ;
      }
      
      this.$router.push('/artworks');
    }
  },
};
</script>
