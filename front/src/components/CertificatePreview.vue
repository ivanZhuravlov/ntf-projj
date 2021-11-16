<template>
  <div class="container max-w-7xl px-4 mx-auto space-y-8 sm:px-6 xs:px-6">
    <div class="container mx-auto grid xs:grid-cols-1 sm:grid-cols-1 grid-cols-2 gap-8">
      <img class="max-w-screen-lg h-auto" :src="`https://ipfs.io/ipfs/${certificate.token_uri}`">
      <div>
        <router-link :to='`/art/${certificate.id}`' class="text-gray-800 text-3xl font-bold capitalize leading-relaxed">
          {{ certificate.data.title }}
        </router-link>
        <h2 class="text-gray-500 capitalize">{{ certificate.data.lastName }} {{ certificate.data.firstName }}</h2>
        <p class="text-gray-700">
          {{ certificate.data.description }}
        </p>
        <div class="grid grid-cols-2 mt-6">
          <div class="space-y-2">
            <div v-if='certificate.data.artPieceId' class="uppercase">Art piece: {{certificate.data.artPieceId }}</div>
            <div v-if='certificate.data.size' class="uppercase">Size: {{certificate.data.size }}</div>
            <div v-if='certificate.data.material' class="uppercase">Material: {{certificate.data.material }}</div>
            <div v-if='certificate.data.technical' class="uppercase">Technical: {{certificate.data.technical}}</div>
            <div v-if='certificate.data.movment' class="uppercase">Movment: {{certificate.data.movment}}</div>
          </div>
          <div class="space-y-4">
            <div class="text-gray-500 uppercase">COA Transaction</div>
            <a :href="'https://etherscan.io/tx/' + certificate.data.transaction" target="_blank" class="underline text-blue-600 hover:text-blue-700">{{ clean(certificate.data.transaction) }}</a>
            <div class="text-gray-500 uppercase">Owner Address</div>
            <a :href="'https://etherscan.io/address/' + certificate.data.artistAddress" target="_blank" class="underline text-blue-600 hover:text-blue-700">{{ clean(certificate.data.artistAddress) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CertificatePreview',
  props: {
    certificate: {}
  },
  methods: {
    clean(longText) {
      return longText.slice(0, 8) + ' ... ' + longText.slice(-8);
    }
  },
};
</script>
