<template>
  <div class="container max-w-xl mx-auto text-center space-y-8 px-8 bg-gray-50 py-6 rounded-lg">
    <div class="mx-auto grid grid-cols-1 gap-8">
      <h2 class="text-gray-800 text-lg leading-relaxed">
        You wallet address: 
        <span class="select-all">{{ address }}</span>
      </h2>
      <div v-if='words'>
        <h1 class="text-xl leading-relaxed font-bold underline">Save this words!</h1>
        <div class="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6 my-6 justify-start border-2 border-yellow-400 rounded-md px-8 py-6">
          <div v-for='(word, k) in splitedWords' :key='k'> 
            <p class="text-left">
              <span class="select-none">{{ k + 1 }}: </span><span class="underline select-all"> {{ word }} </span></p>
          </div>
        </div>

        <p class="bg-yellow-400 bg-opacity-20 px-6 py-6 rounded-md">
          <span class="font-semibold">This is the only time you can access it.</span>
          This information is sensitive, Your phrase is the key to your wallet. 
          Please make sure to write it down and save it in a secure location. 
        </p>
      </div>
      <div v-else>
        <p class="bg-yellow-400 bg-opacity-20 px-6 py-6 rounded-md">
          The 12 words of your wallet have already been registered.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Wallet",
  props: {
    words: null,
    address: null,
  },
  computed: {
    splitedWords() {
      return this.words.split(' ');
    }
  },
};
</script>