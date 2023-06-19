<template>
  <div class="art space-y-8 mb-12">
    <div class="space-y-8 w-full flex flex-col justify-center px-8 lg:px-24">

      <div>
        <h1 class="text-gray-800 text-3xl font-bold uppercase leading-relaxed xs:text-center">{{ token.name }}</h1>
        <div class="text-gray-500 flex items-center space-x-2">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <div>Ownership address {{ token.data.artistAddress }}</div>
        </div>
      </div>

      <div class="flex flex-wrap">
        <div class="w-1/4 xs:w-full flex flex-col justify-center space-y-2">
          <RenewedPreview :certificate="token" isLarge="true" />
          <div class="uppercase text-xs">
            Entrust artwork with the aft certificate of Authenticity
          </div>
          <div class="grid grid-cols-2 gap-2 uppercase text-sm">
            <button class="flex justify-around items-center bg-gray-300 bg-opacity-50 hover:bg-opacity-80 font-semibold rounded-lg shadow-xl outline-none transition duration-100 px-1 py-3">
              <HelpIcon fill="#B6B6B6"/>
              Assign the care
            </button>
            <button class="flex justify-around items-center bg-orange bg-opacity-80 hover:bg-opacity-90 text-white font-semibold rounded-lg shadow-xl outline-none transition duration-100 px-2 py-3">
              <HelpIcon />
              Transfer ownership
            </button>
          </div>
        </div>

        <div class="space-y-4 w-3/4 px-12">
          <h1 class="text-gray-700 text-3xl font-bold uppercase leading-relaxed xs:text-center">{{ token.data.title }}</h1>
          <div class="space-y-2 tracking-widest uppercase text-gray-600">
            <div>Artist: {{ token.name }}</div>
            <div v-if='token.data.technical'>Technicque: {{ token.data.technical}}</div>
            <div v-if='token.data.createdAt'>Date: {{ new Date(token.data.createdAt).toISOString().split('-')[0] }}</div>
            <div v-if='token.data.size'>Dimensions: {{ token.data.size }}</div>
            <div>Copy: Original Work</div>
          </div>

          <div class="grid grid-flow-row grid-rows-1 lg:grid-cols-7 lg:grid-flow-row lg:border-t border-gray-300">
            <div class="col-span-4 text-sm mt-2 space-y-4 border-0 lg:border-r border-gray-300 pr-4">
              <div class="flex items-center space-x-8">
                <svg class="w-12 h-12" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect opacity="0.5" width="50" height="50" fill="url(#pattern0)"/><defs><pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="#image0_256_967" transform="scale(0.00862069)"/></pattern><image id="image0_256_967" width="116" height="116" xlink:href="data:image/png;base64,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"/></defs></svg>
                <div class="uppercase text-gray-600 text-xs">aft recorded in polygon blockchain</div>
              </div>
              <div class="w-full text-xs space-y-2">
                <div>Artist: {{ token.data.artistAddress }}</div>
                <div>Transaction Hash: {{ token.data.transaction }}</div>
                <div>Timestamp: {{ new Date(token.data.createdAt).toString().split(' (')[0] }}</div>
              </div>
            </div>
            <div class="col-span-3 mt-2 text-gray-700 py-4 pl-2 space-y-4">
              <router-link class="flex items-center space-x-2 cursor-pointer" :to='`/info/coa/${token.id}`'>
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <div>Download <span class="text-orange">AFT</span> Certificate of Authenticity</div>
              </router-link>
              <div class="flex items-center space-x-2 cursor-pointer text-orange">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.3999 8.4C13.7372 8.4 13.1999 7.86274 13.1999 7.2C13.1999 6.53726 13.7372 6 14.3999 6H20.3999C21.0626 6 21.5999 6.53726 21.5999 7.2V13.2C21.5999 13.8627 21.0626 14.4 20.3999 14.4C19.7372 14.4 19.1999 13.8627 19.1999 13.2V10.0971L14.0484 15.2485C13.5798 15.7172 12.82 15.7172 12.3514 15.2485L9.5999 12.4971L4.44843 17.6485C3.9798 18.1172 3.22 18.1172 2.75137 17.6485C2.28275 17.1799 2.28275 16.4201 2.75137 15.9515L8.75137 9.95147C9.22 9.48284 9.9798 9.48284 10.4484 9.95147L13.1999 12.7029L17.5028 8.4H14.3999Z" fill="#FB6D06"/></svg>
                <div>Upgrade with Royalties</div>
              </div>
              <router-link class="flex items-center space-x-2 cursor-pointer" :to='`/info/printables/${token.id}`'>
                <svg class="w-4 h-4" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.52222 11H11.5222V3H3.52222V11ZM5.52222 5H9.52222V9H5.52222V5Z" fill="#777774"/><path d="M3.52222 21H11.5222V13H3.52222V21ZM5.52222 15H9.52222V19H5.52222V15Z" fill="#777774"/><path d="M13.5222 3V11H21.5222V3H13.5222ZM19.5222 9H15.5222V5H19.5222V9Z" fill="#777774"/><path d="M21.5222 19H19.5222V21H21.5222V19Z" fill="#777774"/><path d="M15.5222 13H13.5222V15H15.5222V13Z" fill="#777774"/><path d="M17.5222 15H15.5222V17H17.5222V15Z" fill="#777774"/><path d="M15.5222 17H13.5222V19H15.5222V17Z" fill="#777774"/><path d="M17.5222 19H15.5222V21H17.5222V19Z" fill="#777774"/><path d="M19.5222 17H17.5222V19H19.5222V17Z" fill="#777774"/><path d="M19.5222 13H17.5222V15H19.5222V13Z" fill="#777774"/><path d="M21.5222 15H19.5222V17H21.5222V15Z" fill="#777774"/></svg>
                <div>Printables</div>
              </router-link>
            </div>
          </div>


          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-2 py-1">
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-2 py-3">
                    From
                  </th>
                  <th scope="col" class="px-2 py-3">
                    To
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Start
                  </th>
                  <th scope="col" class="px-2 py-3">
                    End
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(hItem, key) in historyOverview"
                  :key='hItem.id + key'
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th class="px-2">
                    <ViewIcon />
                  </th>
<!--                  <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">-->
                  <th class="px-2">
                    {{ hItem.status }}
                  </th>
                  <td class="px-2">
                    {{ hItem.from }}
                  </td>
                  <td class="px-2">
                    {{ hItem.to }}
                  </td>
                  <td class="px-2">
                    {{ hItem.start }}
                  </td>
                  <td class="px-2">
                    {{ hItem.end }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>



        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import RenewedPreview from '@/components/RenewedPreview.vue';
import HelpIcon from '@/components/icons/HelpIcon.vue';
import ViewIcon from '@/components/icons/ViewIcon.vue';

export default {
  name: 'ArtSelected',
  props: {
    token: {
      type: Object,
    },
  },
  data() {
    return {
      historyOverview: [
        {
          id: '213asd',
          status: 'created',
          from: 'Jenko.io',
          to: 'Eskander Noilst',
          start: new Date().toISOString(),
          end: null,
        },
        {
          id: '223asdsa',
          status: 'HOSTED',
          from: 'Eskander Noilst',
          to: 'gallery DM Street',
          start: new Date().toISOString(),
          end: new Date().toISOString(),
        },
        {
          id: '224asqa',
          status: 'SCAN RETURN',
          from: 'gallery DM Street',
          to: 'Eskander Noilst',
          start: new Date().toISOString(),
          end: null,
        },
        {
          id: '224ww',
          status: 'PENDING',
          from: 'Eskander Noilst',
          to: null,
          start: null,
          end: null,
        },
      ],
    }
  },
  components: {
    RenewedPreview,
    HelpIcon,
    ViewIcon,
  },
  methods: {
    clean(longText) {
      return longText ? longText.slice(0, 8) + ' ... ' + longText.slice(-8) : '';
    },
  }
}
</script>
