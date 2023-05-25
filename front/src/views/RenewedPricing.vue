<template>
  <div class="service">
    <Header />
    <div class="flex justify-center w-full px-4">
      <div class="max-w-4xl grid grid-cols-1 gap-2 place-items-center">

        <h1 class="text-gray-500 text-3xl capitalize leading-relaxed mt-16 text-lightGay">PRICING</h1>
        <h2 class="text-gray-400 font-light leading-9 text-lightGay text-2xl capitalize leading-relaxed mt-2">14 DAYS FREE</h2>

        <div class="mt-2 grid gap-4 grid-cols-3">
          <h3 class="not-italic font-medium text-sm text-lightGay">Monthly</h3>
          <div>
            <label class="flex items-center relative w-max cursor-pointer">
              <input type="checkbox" :checked="isYearly" @change="changeSwitcher" class="input-month-year-switcher appearance-none transition-colors cursor-pointer w-12 h-6 rounded-full bg-gray-500" />
              <span class="w-6 h-6 right-6 absolute rounded-full transform transition-transform bg-gray-200" />
            </label>
          </div>
          <h3 class="not-italic font-medium text-sm text-lightGay">Yearly</h3>
        </div>

        <hr class="w-full h-px my-8 border-0 bg-passionGay">

        <div class="space-y-4">
          <div v-if='error' class="max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
            <span class="block sm:inline">{{ error }}</span>
          </div>
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center select-none">
            <div v-for='(product, key) in products' :key='key' class="card-shadow px-4 bg-lighterGay w-60 h-full inline-flex flex-col items-center rounded-lg">
              <h2 class="title-gradient tracking-widest indent-0.5 not-italic font-black text-lg leading-10 pt-4">{{ product.title }}</h2>
              <hr class="w-full h-px mt-4 border-0 bg-passionGay">
              <h2 class="text-gray-800 mt-4 text-lg capitalize leading-relaxed">{{ product.price }}$ / {{ isYearly? 'year' : 'month' }}</h2>
              <hr class="w-full h-px border-0 bg-passionGay mt-4">
              <h2 class="text-lightGay mt-4 text-lg capitalize leading-relaxed">Get every Month</h2>
              <h3 :class="`text-4xl mt-2 font-bold text-4xl tracking-super-wide ${ key % 2 === 0?'text-darkGray' : 'text-lighterOrange'}`" :ref="`productAmount_${key}`">{{product.amount}}</h3>
              <h3 :class="`text-4xl mt-2 font-bold text-5xl ${ key % 2 === 0?'text-darkGray' : 'text-lighterOrange'}`">AFTs</h3>
              <p class="mt-14 font-semibold text-base text-lightGay">{{ product.description }}</p>
              <button :class="`mt-12 mb-6 rounded-lg bg-toughGay py-2 px-5 try-button ${ key % 2 === 0?'text-darkGray' : 'text-lighterOrange'}`">TRY FOR FREE</button>
            </div>
          </div>
        </div>

        <hr class="w-full h-px mt-12 border-0 bg-passionGay">
        <p class="font-light text-xl text-lightGay ">Try it 14 days without engagement and choose the quantity you need</p>
        <hr class="w-full h-px mt-1.5 border-0 bg-passionGay">

      </div>
    </div>

    <div class="flex justify-center w-full px-4 mt-12">
      <div class="grid grid-cols-1 gap-2 place-items-center">
        <div class="space-y-4">
          <div class="grid grid-cols-4 gap-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center select-none">
            <div v-for='(plan, key) in plans' :key='key' class="card-shadow px-4 bg-lighterGay w-60 h-full inline-flex flex-col items-center rounded-lg">
              <h2 class="title-gradient tracking-widest indent-0.5 not-italic font-black text-lg leading-10 pt-4">{{ plan.title }}</h2>
              <hr class="w-full h-px mt-4 border-0 bg-passionGay">
              <h2 class="text-gray-800 mt-4 text-lg capitalize leading-relaxed">{{ plan.price }}$</h2>
              <hr class="w-full h-px border-0 bg-passionGay mt-4">
              <h2 class="text-lightGay mt-4 text-lg capitalize leading-relaxed">Get once</h2>
              <h3 :class="`text-4xl mt-2 font-bold text-4xl tracking-super-wide text-darkGray`">{{plan.amount}}</h3>
              <h3 :class="`text-4xl mt-2 font-bold text-5xl text-darkGray`">AFTs</h3>
              <button :class="`mt-12 mb-6 rounded-lg bg-toughGay py-2 px-5 try-button text-darkGray`">TRY FOR FREE</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto mt-8">
      <div class="flex justify-center w-full">
        <div class="w-full max-w-3xl grid grid-cols-1 gap-2 place-items-center">
          <hr class="w-full h-px mt-12 border-0 bg-passionGay">
          <p class="font-light text-xl text-lightGay ">LEARN MORE HOW IT WORKS</p>
          <hr class="w-full h-px mt-1.5 border-0 bg-passionGay">
        </div>
      </div>
    </div>

    <div class="flex justify-center w-full px-4 mt-12 mb-20">
      <div class="grid grid-cols-1 gap-2 place-items-center">
        <div class="space-y-4">
          <div class="grid grid-cols-3 gap-12 sm:grid-cols-2 xs:grid-cols-1 place-items-center select-none">
            <div v-for='(description, key) in descriptions' :key='key' class="px-4 h-full inline-flex flex-col items-center">
              <div class="flex justify-center items-center">
                <img class="w-6 h-6 mr-2" alt="description" :src="require(`@/assets/icons/${description.iconName}`)">
                <h2 class="text-fontGray font-light text-2xl leading-8">{{ description.title }}</h2>
              </div>
              <h3 class="mt-2 font-normal text-base ">{{ description.description }}</h3>
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
import { upCount } from '@/animations'

export default {
  name: 'RenewedPricing',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isYearly: false,
      products: [
        {
          title: 'Starting',
          name: 'Starting',
          description: 'Ideal to start',
          price: 5.99,
          amount: 20,
        },
        {
          title: 'Recommended',
          name: 'Recommended',
          description: 'Ideal for productive Creator',
          price: 8.49,
          amount: 60,
        },
        {
          title: 'Professional',
          name: 'Professional',
          description: 'Ideal for Professional',
          price: 24.99,
          amount: 200,
        },
      ],
      plans: [
        {
          title: 'Free',
          name: 'Free',
          price: 'Air Drop',
          amount: 3,
        },
        {
          title: 'Credit',
          name: 'Credit',
          price: 2.99,
          amount: 5,
        },
        {
          title: 'Credit',
          name: 'Credit',
          price: 9.99,
          amount: 25,
        },
        {
          title: 'Credit',
          name: 'Credit',
          price: 19.99,
          amount: 60,
        },
      ],
      descriptions: [
        {
          title: 'PROTECT YOUR ART',
          description: 'Secure your Artwork with an unique AFT Certificate of Authenticity recorded in Blockchain.  Ensure your Collectors it’s from you. Authorize the Gallery to create certificates on your behalf.',
          iconName: 'Vector.svg',
        },
        {
          title: 'TRANSFER & REWARD',
          description: 'Transfer easily the Certificate of Authenticity to Gallery and Collector & keep a complete traceability of your Artwork. Reward value makers (such as the Gallery and the Collector) with Royalties. discover our AFT Agreement',
          iconName: 'Tranfer&Reward.svg',
        },
        {
          title: 'MANAGE YOUR ASSETS',
          description: 'Get the full picture of your assets in the Dashboard, manage easily the transfer of AFT Certificate of Authenticity and Fruit your Artwork with our Royalties System provided. ',
          iconName: 'Manage-light.svg',
        },
      ],
      error: null,
    }
  },
  async mounted() {
    // await this.fetchProducts();
    this.animateCardData()
  },
  methods: {
    animationUpCount(options) {
      upCount(options)
    },
    animationUpCountForCards(options) {
      this.animationUpCount({ initialValue: 0, ...options })
    },
    animateCardData() {
      this.products.forEach((product, index) => {
        this.animationUpCountForCards({
          element: this.$refs[`productAmount_${index}`],
          finalValue: product.amount,
        })
      })
    },
    changeSwitcher() {
      this.isYearly = !this.isYearly
    },

    async fetchProducts() {
      this.products = await fetch(this.$store.getters.api + '/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((r) => r.json());
      console.log(this.products);
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

      this.$router.push('/dashboard');
    }
  },
};
</script>

<style>
  input.input-month-year-switcher:checked ~ span:last-child {
    --tw-translate-x: 1.5rem; /* translate-x-6 */
  }
  .card-shadow {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  .title-gradient {
    background: -webkit-linear-gradient(#B9B9B9, #DDDDDD);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold !important;
  }
  .try-button {
    -webkit-transition: background-color 700ms linear;
    -moz-transition: background-color 700ms linear;
    -o-transition: background-color 700ms linear;
    -ms-transition: background-color 700ms linear;
    transition: background-color 700ms linear;
  }
  .try-button:hover {
    background-color: rgb(209 213 219);
  }
</style>
