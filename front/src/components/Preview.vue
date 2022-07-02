<template>
  <div class="max-w-sm rounded-md text-gray-700 border hover:border-orange h-80" :class="{'h-96': isLarge}">
    <router-link to='/new/coa' class="flex flex-col space-y-6 text-center" v-if="certificate.id === 'new'">
      <div class="font-bold uppercase leading-relaxed text-center cursor-pointer lg:pt-20 pt-16">
        new <span class="text-orange">aft</span>
      </div>
      <div class="flex justify-center h-24">
        <svg class="w-8 h-8 text-orange" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
      </div>
      <div class="bottom-0 flex justify-around pb-4">
        <div class="cursor-pointer">
          <button class="rounded-full hover:shadow w-5 h-5 bg-gray-200 border"></button>
        </div>
        <div class="cursor-pointer">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div class="cursor-pointer">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
      </div>
    </router-link>
    <div v-else class="flex flex-col space-y-4 justify-center">
      <img 
        class="max-w-screen-lg h-auto max-h-72 rounded-t-md cursor-pointer"
        :src="`https://ipfs.io/ipfs/${certificate.token_uri}`"
        :alt="certificate.data.title"
      >
      <router-link :to='`/art/${certificate.id}`' class="font-bold capitalize leading-relaxed text-center cursor-pointer">
        {{ certificate.data.title }}
      </router-link>

      <div class="bottom-0 inline-flex items-center justify-around pb-4">
        <button v-if="certificate.token_id" class="rounded-full hover:shadow w-5 h-5 bg-gray-200 border cursor-pointer"></button>
        <button v-else class="rounded-full hover:shadow w-5 h-5 text-2xl flex items-center cursor-pointer">@</button>
        <div class="cursor-pointer">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div class="cursor-pointer">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Preview',
  props: {
    certificate: {},
    isLarge: false,
  },
  methods: {
    clean(longText) {
      return longText ? longText.slice(0, 8) + ' ... ' + longText.slice(-8) : '';
    }
  },
};
</script>
