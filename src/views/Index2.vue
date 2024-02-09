<script>
import axios from 'axios'
import { useStateStore } from '../store'
import { BRANCH_ID } from '../constants'
import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'
const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
const phone_req = import.meta.env.VITE_SERVER_PHONE_REQUIRED

export default {
  name: 'index2-page',
  data() {
    return {
      services: ''
    }
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore
    }
  },
  computed: {},
  methods: {
    setBranchId(branchId) {
      this.stateStore.set_branch(branchId)
    },
    setQueueId(id) {
      this.stateStore.set_queueId(id)
    },
    getLang() {
      return this.stateStore.get_lang
    },
    getQueueId() {
      return this.stateStore.get_queueId
    },
    async getServices() {
      try {
        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/services`, {
          branchId: BRANCH_ID,
          queueId: this.getQueueId()
        })
        this.services = response.data.content
        console.log(this.services)
      } catch (err) {
        console.log(err)
      }
      // console.log(branchId)
    },
    getFormatService(service) {
      try {
        const arr = service.split(';')
        const result =
          this.getLang() === 'kz'
            ? arr.find((el) => el.includes('KZ')).replace('KZ=', '')
            : this.getLang() === 'ru'
            ? arr.find((el) => el.includes('RU')).replace('RU=', '')
            : arr.find((el) => el.includes('EN')).replace('EN=', '')
        return result
      } catch (err) {
        console.log(err)
      }
    },
    async goNext(service) {
      // console.log(service)
      try {
        if (
          service.maxServTime === ' ' ||
          service.maxServTime === null ||
          service.maxServTime === undefined
        ) {
          this.setBranchId(BRANCH_ID)
          this.setQueueId(service.queueId[0])
          this.$router.push('/index3')
          return
        } else {
          try {
            const branchId = BRANCH_ID
            const queueId = service.queueId[0]
            const iin = this.getiin() ? this.getiin() : '?'
            const local = this.getLang()
            const body = {
              branchId: branchId,
              queueId: queueId,
              iin: iin,
              local: local
            }
            // console.log(body);

            const response = await axios.post(
              `http://${SERVER_HOST}:${SERVER_PORT}/services/event-now`,
              body
            )
            console.log('Response', response)
            if (response.data.message == 'Success') {
              this.setTicketBody(response.data.data)
              this.$router.push('/ticket-info')
            } else {
              console.error('Error in API response:', response.data.message)
            }
          } catch (error) {
            console.error('Error in API request:', error)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goMain() {
      if (iin_req === 'true') {
        this.$router.push('/iin')
      } else if (phone_req === 'true') {
        this.$router.push('/phone')
      } else this.$router.push('/')
    }
  },
  mounted() {
    this.getServices()
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/index2') {
        // console.log('Line 116 redirect index2 page')
        this.goMain()

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 24000)
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be unmounted
    clearInterval(this.checkRouteInterval)
  }
}
</script>
<template>
  <div class="md:container mx-auto">
    <div class="services flex justify-center flex-wrap flex-row mt-24">
      <div
        v-for="service in services"
        :key="service.id"
        @click="goNext(service)"
        class="service text-white text-xl bg-yellow-600 rounded-lg flex items-center justify-center basis-5/12 py-4 m-2"
      >
        <div class="text-center">{{ getFormatService(service.workName[0]) }}</div>
      </div>
      <div
        @click="goBack()"
        class="service text-white text-xl bg-yellow-600 rounded-lg flex items-center justify-center basis-5/12 py-4 m-2"
      >
        <div class="text-center">
          {{ getLang() == 'kz' ? 'Артқа' : getLang() == 'ru' ? 'Назад' : 'Back' }}
        </div>
      </div>

      <!-- <div 
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() === "kz" ? "Kazakh" : getLang() === "ru" ? "Russia" :"England" }}</div>
            </div> -->
    </div>
  </div>
</template>
<style scoped>
.service {
  cursor: pointer;
}
</style>