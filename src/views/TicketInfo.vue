<script>
import axios from 'axios'
import { useStateStore } from '../store'
import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED
export default {
  data() {
    return {
      resp: null,
    }
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore,
    }
  },
  methods: {
    getTicketBody() {
      return this.stateStore.get_ticket_body
    },
    getLang() {
      return this.stateStore.get_lang
    },

    getStart() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    },
    async print() {
      try {
        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/print`, {
          local: this.getLang(),
          // local: 'ru',
          soapBody: this.resp,
        })
        if (response.status === 200) this.$router.push('/print')
      } catch (err) {
        console.log(err)
      }
    },

    async sendEvent() {
      const body = this.getTicketBody()
      this.resp = body
    },
  },
  mounted() {
    this.sendEvent()
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/ticket-info') {
        // console.log('Line 67 redirect ticket info page')
        this.getStart()

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 24000)
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be unmounted
    clearInterval(this.checkRouteInterval)
  },
}
</script>
<template>
  <div class="md:container mx-auto p-4 text-center bg-white bg-opacity-10">
    <div v-if="resp" class="infos w-3/5 mx-auto rounded-lg p-5">
      <div class="info text-white flex justify-center items-center py-3">
        <div class="in text-center text-5xl leading-normal">{{ resp['cus:ticketno'][0] }}</div>
      </div>
      <div class="info text-white flex justify-center items-center py-3">
        <div class="in text-center text-2xl leading-normal">{{ resp['cus:servicename'][0] }}</div>
      </div>
      <div class="info text-white flex justify-center items-center py-3">
        <div class="in text-center text-2xl leading-normal">
          {{
            getLang() == 'kz'
              ? 'Бағалау коды'
              : getLang() == 'ru'
              ? 'Код для оценки:'
              : 'Code for evalutation'
          }}
          {{ resp['cus:ordernum'][0] }}
        </div>
      </div>
    </div>
    <div class="buttons w-2/5 mx-auto mt-8">
      <div class="button text-white text-3xl bg-yellow-600 my-4 py-5 rounded-lg" @click="print()">
        {{ getLang() === 'kz' ? 'Басып шығару' : getLang() === 'ru' ? 'Распечатать' : 'Print' }}
      </div>
      <div
        class="button text-white text-3xl bg-yellow-600 my-4 py-5 rounded-lg"
        @click="getStart()"
      >
        {{
          getLang() === 'kz' ? 'Басты бетке' : getLang() === 'ru' ? 'На главную' : 'To main page'
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  cursor: pointer;
}
</style>