<template>
  <div class="flex flex-col items-center">
    <Header />
    <Hero />
    <CTA />
    <Introduction />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import CTA from '@/components/CTA.vue'
import Introduction from '@/components/Introduction.vue'
import Hero from '@/components/Hero.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    CTA,
    Introduction,
    Hero,
  }
}
</script>
