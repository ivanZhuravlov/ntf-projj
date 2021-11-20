<template>
  <div class="container max-w-lg mx-auto sm:px-6 xs:px-6">
    <div class="bg-white shadow pb-12 mr-4 mb-8 md:mb-0">
      <div class="border-b border-t border-gray-200 py-6 ">
        <h3 class="text-2xl font-bold text-center">
          {{ subscription.product.name }}<span class="text-yellow-600">.</span>
        </h3>
        <p class="text-right mr-8">{{ new Date(subscription.created_at).toDateString() }} </p>
      </div>
      <div class="px-10">
        <div class="flex mt-10 items-end justify-between">
          <h4 class="text-5xl font-black leading-snug">{{ subscription.product.price }}<span class="text-2xl">€</span></h4>
          <p class="font-medium mb-3">
            <span>Usage: {{ certificatesCount }}/{{ subscription.product.coaCount }}</span>
          </p>
        </div>
        <div class="h-48">
          <p class="border-t border-gray-100 mt-4 pt-4 font-bold  text-sm">What You Get</p>
          <div class="text-base font-medium mt-4 text-blue-500 flex justify-start items-center">
            <svg class="w-4 h-4 fill-current mr-2 mt-1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1"><g transform="translate(-1 -3)"><path d="M14.305 3.344l1.06 1.061-8.75 8.751-5.038-5.038 1.06-1.06 3.977 3.977z"/></g></g></svg>
            lorem Ipsum
          </div>
          <div class="text-base font-medium mt-4 text-blue-500 flex justify-start items-center">
            <svg class="w-4 h-4 fill-current mr-2 mt-1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1"><g transform="translate(-1 -3)"><path d="M14.305 3.344l1.06 1.061-8.75 8.751-5.038-5.038 1.06-1.06 3.977 3.977z"/></g></g></svg>
            lorem Ipsum
          </div>
          <div class="text-base font-medium mt-4 text-blue-500 flex justify-start items-center">
            <svg class="w-4 h-4 fill-current mr-2 mt-1" xmlns="http://www.w3.org/2000/svg"><g stroke="none" stroke-width="1"><g transform="translate(-1 -3)"><path d="M14.305 3.344l1.06 1.061-8.75 8.751-5.038-5.038 1.06-1.06 3.977 3.977z"/></g></g></svg>
            lorem Ipsum
          </div>
        </div>
        <div
        v-if='!subscription.terminated_at && subscription.is_active'
          class="text-center my-2 w-full font-semibold text-white bg-gray-700 rounded border border-solid border-gray-600 border-opacity-25 py-3"
        >
          Current Plan
        </div>
        
        <div
          v-else
          disabled
          class="text-center my-2 w-full cursor-not-allowed font-semibold hover:bg-gray-300 rounded border border-solid text-gray-600 py-3 bg-gray-200 disabled:opacity-50"
        >
          Terminated ({{ new Date(subscription.terminated_at).toDateString() }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Subscription',
  props: {
    subscription: {},
    certificatesCount: null
  },
};
</script>
