<template>
  <div class="add-royalties">
    <Header />
    <div class="flex items-center flex-col">
      <div class="container px-2 sm:px-3 md:px-4 xs:px-3 flex items-center flex-col max-w-7xl">
        <div class="xs:hidden w-full px-4">
          <carousel-3d>
            <slide v-for="(slide, i) in slides" :key="i" :index="i">
              <img src="https://placehold.it/360x270">
            </slide>
          </carousel-3d>
        </div>
        <div class="xs:mt-4 w-full grid grid-cols-5 sm:grid-cols-3 xs:grid-cols-1 gap-4">
          <div v-for="(slide, i) in slides" :key="i" :index="i">
            <img src="https://placehold.it/360x270">
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
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'Portfolio',
  components: {
    Header,
    Footer,
    Carousel3d,
    Slide,
  },
  methods: {
    redirect() {
      this.$router.push(`/login`)
    },
  },
  data() {
    return {
      slides: 7,
    }
  }
};
</script>
