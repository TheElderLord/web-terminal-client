<script>
import { useStateStore } from '../store'
import axios from 'axios'

const branchId = import.meta.env.VITE_SERVER_BRANCH_ID

import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'
export default {
  data() {
    return {
      services: [],
      days: [],
      slots: [],
      hide: true,

      queueId: null,
      day: null,
      time: null,

      bookCode: null,
    }
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore,
    }
  },

  methods: {
    getBranchId() {
      return this.stateStore.get_branch
    },
    getLang() {
      return this.stateStore.get_lang
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
        return service
      }
    },
    async getWebServices() {
      try {
        this.services = []
        const response = await axios.post(
          `http://${SERVER_HOST}:${SERVER_PORT}/booking/webservices`,
          {
            branchId: branchId,
            queuId: '?',
          },
        )
        const webs = response.data.data.filter((element) => element !== '' || element !== undefined)
        this.services = webs
      } catch (err) {
        console.log(err)
      }

      // console.log(this.services)
    },
    async getDays() {
      try {
        this.days = []
        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/booking/days`, {
          branchId: branchId,
        })
        this.days.push(response.data[0])
        this.days.push(response.data[1])
      } catch (err) {
        console.log(err)
      }

      // console.log(this.days)
    },
    async getTime() {
      this.slots = []
      const now = new Date()
      const bookDay = now.getDate() == this.day.substring(0, 2) ? 0 : this.day.substring(0, 2)
      console.log(bookDay)
      const body = {
        branchId: branchId,
        queueId: this.queueId,
        day: bookDay,
      }
      // console.log(body)
      try {
        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/booking/time`, body)

        this.slots = response.data
        this.slots.shift()
        console.log(this.slots)
      } catch (err) {
        console.log(err)
      }
    },
    async reserve() {
      const formattedTime = this.time.split('-')[1]

      const bookTime = this.time.split('-')[0] + ':' + formattedTime + ':00' + '/' + this.day
      const reqBody = {
        branchId: branchId,
        queueId: this.queueId,
        iin: '?',
        time: bookTime,
      }
      console.log(reqBody)
      try {
        const response = await axios.post(
          `http://${SERVER_HOST}:${SERVER_PORT}/booking/reserve`,
          reqBody,
        )
        this.bookCode = response.data[0]
        this.queueId = ''
        this.day = ''
        this.time = ''
        this.hide = false
      } catch {
        this.stateStore.set_message(
          'RU=Произошла ошибка. Попробуйте поэже;KZ=Қате. Кейін қайталап көріңіз;EN=Error occured. Try again later',
        )
        this.queueId = ''
        this.day = ''
        this.time = ''
        this.hide = false
        return this.$router.push('/messages')
      }

      // if(response.data == 'Failed'){
      //     alert("error occured")
      //     return
      // }

      // console.log(response.data)
    },
    goMain() {
      const iin_req = import.meta.env.VITE_SERVER_INN_REQUIRED
      if (iin_req == 'true') {
        this.$router.push('/iin')
      } else {
        this.$router.push('/')
      }
    },
  },
  mounted() {
    this.getWebServices()
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/reserve-order') {
        // console.log('Line 125 redirect index page')
        this.goMain()

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
  <div class="md:container mx-auto">
    <div v-if="bookCode" class="title text-white text-5xl text-center my-5 font-bold py-5">
      {{
        getLang() == 'kz'
          ? 'Сіздің броньдау кодыңыз'
          : getLang() == 'ru'
          ? 'Ваш код бронирования'
          : 'Your reserving code'
      }}
      : {{ bookCode }}
    </div>
    <div v-if="hide" class="form">
      <div class="title text-white text-2xl text-center my-5">
        {{ getLang() == 'kz' ? 'Броньдау' : getLang() == 'ru' ? 'Бронирование' : 'Reserving' }}
      </div>

      <div class="field mx-auto">
        <div class="web-serv w-6/12 mx-auto my-4 py-4">
          <label for="webServices" class="text-white text-lg">
            {{
              getLang() == 'kz'
                ? 'Қызметті таңдаңыз'
                : getLang() == 'ru'
                ? 'Выберите услугу'
                : 'Select a service'
            }}
          </label>
          <select
            v-model="queueId"
            @change="getDays()"
            name="webServices"
            id="sel"
            class="border-2 border-black rounded-lg w-full h-12 text-lg"
          >
            <option
              :value="service.queueId[0]"
              v-for="service in services"
              :key="service.queueId[0]"
            >
              {{ getFormatService(service['workName'][0]) }}
            </option>
          </select>
        </div>
        <div class="days w-6/12 mx-auto my-4 py-4">
          <label for="days" class="text-white text-lg">
            {{
              getLang() == 'kz'
                ? 'Күнді таңдаңыз'
                : getLang() == 'ru'
                ? 'Выберите дату'
                : 'Select a date'
            }}
          </label>
          <select
            v-model="day"
            @change="getTime()"
            name="days"
            id="sel"
            class="border-2 border-black rounded-lg w-full h-12 text-lg"
          >
            <option :value="day" v-for="day in days" :key="day">
              {{ day }}
            </option>
          </select>
        </div>
        <div class="slots w-6/12 mx-auto my-4 py-4">
          <label for="slots" class="text-white text-lg">
            {{
              getLang() == 'kz'
                ? 'Уақытты таңдаңыз'
                : getLang() == 'ru'
                ? 'Выберите время'
                : 'Select a time'
            }}
          </label>
          <select
            v-model="time"
            name="slots"
            id="sel"
            class="border-2 border-black rounded-lg w-full h-12 text-lg"
          >
            <option :value="slot.hour + '-' + slot.minute" v-for="slot in slots" :key="slot.id">
              {{ slot.hour + ':' + slot.minute }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="hide" class="submit mt-5 flex">
      <button
        @click="reserve()"
        class="text-white w-fit text-center bg-yellow-600 py-3 px-10 text-xl mx-auto rounded-lg"
      >
        {{ getLang() == 'kz' ? 'Растау' : getLang() == 'ru' ? 'Подтвердить' : 'Submit' }}
      </button>
    </div>
    <div class="submit mt-5 flex">
      <button
        @click="goMain()"
        class="text-white w-fit text-center bg-yellow-600 py-3 px-10 text-xl mx-auto rounded-lg"
      >
        {{ getLang() == 'kz' ? 'Басты бет' : getLang() == 'ru' ? 'Главная страница' : 'Main page' }}
      </button>
    </div>
  </div>
</template>