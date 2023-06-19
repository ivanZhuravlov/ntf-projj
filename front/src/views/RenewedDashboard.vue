<template>
  <div class="dashboard">
    <Header v-on:searchUpdated="searchArt" />

    <modal name="claim-tokens-modal" :adaptive="true">
      <div class="h-full">
        <div class="w-full text-center py-4">
          <p class="text-slightOrange text-3xl">Welcome to Jenko</p>
        </div>
        <div class="flex justify-center items-center h-3/6">
          <p class="text-textGray text-2xl text-center">
            As a new user, you receive a credit
            <br>
            of
            <br>
            3 free AFT
          </p>
        </div>
        <div class="mt-4 flex justify-center">
          <button @click="redirectToProfile" class="pop-up-button bg-regularGay hover:bg-gray-200 active:bg-gray-200 focus-visible:ring ring-gray-300 focus:ring-2 text-lighterOrange text-sm md:text-base font-semibold text-center outline-none transition duration-500 px-16 py-2">
            START
          </button>
        </div>
      </div>
    </modal>

    <div class="container max-w-full px-4 mt-8">
      <div class="pl-4 xs:pl-0 ">
        <h2 class="uppercase font-medium text-3xl indent-0.5 text-darkGray">{{ user && user.name }}</h2>
        <div class="flex align-center content-baseline xs:items-center mt-1.5">
          <img class="w-5 h-5 sm:w-4 sm:h-4 xs:w-6 xs:h-6 mr-2" alt="verified_icon" :src="require(`@/assets/icons/verified.svg`)">
          <p class="text-ellipsis font-normal text-base indent-0.5 text-slightGay sm:text-sm">OWNERSHIP ADRESS: <code class="sm: text-xs break-all">0x00192fb10df37c9fb26829eb2cc623cd1bf599e8</code></p>
        </div>
      </div>
      <hr class="w-full h-px mt-12 border-0 bg-passionGay">
    </div>

    <div v-if="selectedId">
      <ArtSelected :token="token" :class="`${change? 'appear': 'disappear'}`" />
    </div>

    <div class="container mx-auto max-w-4xl">
      <div class="mt-2 grid grid-cols-8 gap-1 xs:gap-2 sm:grid-cols-6 xs:grid-cols-3 xs:px-2 sm:px-3">
        <router-link to="/new/aft" class="flex flex-col items-center">
          <div class="flex">
            <p class="font-medium text-base indent-0.5 text-lightGay">CREATE</p>
            <p class="font-medium text-base indent-0.5 text-lighterOrange ml-1">AFT</p>
          </div>
          <img class="mt-1 w-5 h-5 sm:w-4 sm:h-4 xs:w-6 xs:h-6 mr-2" alt="add_photo_alternate" :src="require(`@/assets/icons/add_photo_alternate.svg`)">
        </router-link>
        <div class="cursor-pointer" @click="changeFilter('credit')">
          <div class="flex flex-col items-center">
            <p class="font-medium text-base indent-0.5 text-lightGay">CREDIT</p>
            <p class="font-medium text-xl indent-0.5 text-lightGay">10</p>
          </div>
        </div>
        <div class="cursor-pointer" @click="changeFilter(null)">
          <div class="flex flex-col items-center">
            <p class="font-medium text-base indent-0.5 text-lightGay">ALL</p>
            <p class="font-medium text-xl indent-0.5 text-lightGay">{{ certificates.length }}</p>
          </div>
        </div>
        <div class="cursor-pointer" @click="changeFilter('pending')">
          <div class="flex flex-col items-center">
            <p class="font-medium text-base indent-0.5 text-lightGay">PENDING</p>
            <p class="font-medium text-xl indent-0.5 text-lightGay">{{ certificates.filter((c) => !c.token_id).length }}</p>
          </div>
        </div>
        <div class="cursor-pointer" @click="changeFilter('hosted')">
          <div class="flex flex-col items-center">
            <p class="font-medium text-base indent-0.5 text-lightGay">HOSTED</p>
            <p class="font-medium text-xl indent-0.5 text-lightGay">{{ certificates.filter((c) => c.token_id).length }}</p>
          </div>
        </div>
        <div class="cursor-pointer" @click="changeFilter('sold')">
          <div class="flex flex-col items-center">
            <p class="font-medium text-base indent-0.5 text-lightGay">SOLD</p>
            <!--  TODO: this is hardcoded -->
            <p class="font-medium text-xl indent-0.5 text-lightGay">4</p>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-center">
            <img class="w-5 h-5 sm:w-4 sm:h-4 xs:w-6 xs:h-6 mr-2" alt="sync_alt" :src="require(`@/assets/icons/sync_alt.svg`)">
            <p class="font-medium text-base indent-0.5 text-lightGay">SORT</p>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-center">
            <div @click="() => changeViewType(ViewTypeEnum.LIST)" class="cursor-pointer">
              <ListCheckListIcon className="w-6 h-6 mr-2" :fill="viewType === ViewTypeEnum.LIST? '#777774' : '#B6B6B6'"/>
            </div>
            <div @click="() => changeViewType(ViewTypeEnum.GRID)" class="cursor-pointer">
              <DashboardCoolIcon className="w-4 h-4" :fill="viewType === ViewTypeEnum.GRID? '#777774' : '#B6B6B6'" />
            </div>

          </div>
        </div>

      </div>
      <hr class="w-full h-px mt-4 border-0 bg-passionGay">
    </div>

    <div v-if='certificates.length'>

      <div v-if="viewType === ViewTypeEnum.GRID" class="container max-w-7xl mx-auto grid lg:grid-cols-4 grid-cols-2 md:px-10 sm:px-4 xs:px-5 xs:grid-cols-1 pt-6 gap-8">
        <div v-for="certificate in list" :key='certificate.id' class="hover:shadow-md rounded-md" @click="openCertificate(certificate.id)">
          <RenewedPreview :certificate="certificate" />
        </div>
      </div>

      <div v-if="viewType === ViewTypeEnum.LIST" class="container max-w-7xl sm:px-4 xs:px-2 mx-auto grid grid-cols-1 gap-1">
        <div v-for="certificate in list" :key='certificate.id'>
          <ListItemPreview :certificate="certificate" />
        </div>
      </div>

    </div>

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import RenewedPreview from '@/components/RenewedPreview.vue';
import ListItemPreview from '@/components/ListItemPreview.vue';
import Subscription from '@/components/Subscription.vue';
import DashboardCoolIcon from '@/components/icons/DashboardCoolIcon.vue';
import ListCheckListIcon from '@/components/icons/ListCheckListIcon.vue';
import ArtSelected from '@/components/ArtSelected.vue';
import { opacityChange } from "@/animations";

const ViewTypeEnum = {
  GRID: 'grid',
  LIST: 'list'
}

export default {
  name: 'RenewedDashboard',
  components: {
    Header,
    Footer,
    Subscription,
    RenewedPreview,
    ListItemPreview,
    DashboardCoolIcon,
    ListCheckListIcon,
    ArtSelected,
  },
  data() {
    return {
      token: null,
      selectedId: null,
      change: false,
      ViewTypeEnum: Object.freeze(ViewTypeEnum),
      viewType: ViewTypeEnum.GRID,
      user: null,
      artist: null,
      subscriptions: [],
      certificates: [],
      filter: null,
      artPieces: [],
    }
  },
  computed: {
    list() {
      let certificates = this.certificates;
      if(this.filter) {
        if(this.filter === 'pending') {
          certificates = this.certificates.filter((c) => !c.token_id);
        }
        if(this.filter === 'hosted') {
          certificates = this.certificates.filter((c) => c.token_id);
        }
      }

      return [{id: 'new'}, ...certificates];
    }
  },
  async mounted() {
    await this.fetchProfile();
    // TODO: proper condition has to be added
    if (true) {
      this.$modal.show('claim-tokens-modal')
    }
  },
  methods: {
    redirectToProfile() {
      this.$router.push(`/profile`)
    },
    async openCertificate(id) {
      this.change = false
      await this.fetchArt(id)
      this.selectedId = id
      this.change = true
    },
    changeViewType(newType) {
      this.viewType = newType;
    },
    async fetchArt(id) {
      this.token = await fetch(`${this.$store.getters.api}/art/detail/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((r) => r.json());
    },
    async fetchProfile() {
      const [{user, artist, subscriptions}] = await Promise.all([
        fetch(this.$store.getters.api + '/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.bearer
          }
        }).then((r) => r.json()),
        this.searchArt()
      ]);

      this.user = user;
      this.artist = artist;
      this.subscriptions = subscriptions;
    },
    certificatesCount(subscriptionId) {
      return this.certificates.filter(
          (certificate) => certificate.subscription_id === subscriptionId
      ).length;
    },
    async searchArt() {
      const url = `${this.$store.getters.api}/art/search/${this.$store.getters.search ?? ''}`;
      const { certificates } = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.bearer
        }
      }).then((r) => r.json())

      this.certificates = certificates;
    },
    changeFilter(filter) {
      this.filter = filter;
    }
  }
}
</script>

<style>
  .low-border {
    border-bottom: 1px solid #E5E2E2;
  }
  .list-item-container {
    -webkit-transition: border 300ms linear;
    -moz-transition: border 300ms linear;
    -o-transition: border 300ms linear;
    -ms-transition: border 300ms linear;
    transition: border 300ms linear;
  }
  .list-item-container:hover {
    border: 1px solid #FB6D06;
  }

  .appear {
    animation-duration: 0.5s;
    animation-name: animate-fade;
    animation-delay: 0.5s;
    animation-fill-mode: backwards;
  }

  .disappear {
    animation-duration: 0.5s;
    animation-name: animate-fade-invert;
    animation-delay: 0.5s;
    animation-fill-mode: backwards;
  }

  @keyframes animate-fade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes animate-fade-invert {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

</style>