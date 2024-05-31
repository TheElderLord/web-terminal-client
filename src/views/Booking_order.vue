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
      booking_code: '',
      error: false
    }
  },
  setup() {
    try {
      const stateStore = useStateStore()
      return {
        stateStore
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    getLang() {
      return this.stateStore.get_lang
    },
    addNum(num) {
      if (this.booking_code.length < 12) {
        this.booking_code += num
      }
      this.booking_code = this.booking_code.replace(/[^0-9]/g, '')
    },
    setTicketBody(body) {
      this.stateStore.set_ticket_body(body)
    },
    delNum() {
      this.booking_code = this.booking_code.slice(0, -1)
      this.booking_code = this.booking_code.replace(/[^0-9]/g, '')
    },
    async submit() {
      if (this.booking_code.length == 0) {
        this.error = true
        return
      } else {
        try {
          const result = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/booking/get-book`, {
            bookCode: this.booking_code,
            local: this.getLang()
          })
          console.log(result)
          if (result.data.message == 'Success') {
            this.setTicketBody(result.data.code)
            this.$router.push('/ticket-info')
          } else if (result.data.message == 'NO') {
            this.stateStore.set_message(
              'RU=Не найдено билетов по коду;KZ=Код бойынша билет табылмады;EN=No ticket was found for code'
            )
            return this.$router.push('/messages')
          } else if (result.data.message == 'NO TIME') {
            this.stateStore.set_message('RU=Неподходящее время;KZ=Дұрыс емес уақыт;EN=Invalid time')
            return this.$router.push('/messages')
          } else {
            this.error = true
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    // isCorrect() {
    //     if (this.booking_code.length > 0 && this.booking_code.length < 12 || this.booking_code.length > 12) {
    //         return true;
    //     }
    //     else if (this.error) {
    //         return true;
    //     }
    // },
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
    document.addEventListener('keydown', (e) => {
      switch (e) {
        case 'Backspace':
          this.delNum()
          break
        case 'Enter':
          this.submit()
          break
        default:
          this.booking_code = this.booking_code.replace(/[^0-9]/g, '')
      }
    })
    this.checkRouteInterval = setInterval(() => {
      const currentPath = this.$route.path

      // Check if the route is '/rate'
      if (currentPath === '/booking-order') {
        //   console.log('Line 92 redirect rate page');
        this.goMain()

        // Clear the interval if the condition is met
        clearInterval(this.checkRouteInterval)
      }
    }, 24000)
  },
  beforeUnmount() {
    clearInterval(this.checkRouteInterval)
  }
}
</script>
<template>
  <div class="md:container md:mx-auto p-5">
    <div class="numpad text-center w-3/5 md:mx-auto bg-white bg-opacity-20 rounded-lg p-5">
      <div class="numpadHeader text-center m-8">
        <h1 class="text-white text-4xl m-5">
          {{
            getLang() === 'kz'
              ? 'Броньдау кодын енгізіңіз'
              : getLang() === 'ru'
              ? 'Введите код брони'
              : 'Enter the code'
          }}
        </h1>
        <input
          type="text"
          name="IIN"
          id="IINInp"
          class="w-full h-12 rounded-md text-xl text-center text-black"
          v-model="booking_code"
        />
        <div v-if="error" class="error-text text-red-500 text-xl mt-4">
          Дурыс емес броньдау коды
        </div>
      </div>
      <div class="grid grid-cols-3 gap-5">
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(1)">
          1
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(2)">
          2
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(3)">
          3
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(4)">
          4
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(5)">
          5
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(6)">
          6
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(7)">
          7
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(8)">
          8
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(9)">
          9
        </div>
        <div
          class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white flex items-center justify-center"
          @click="delNum()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="addNum(0)">
          0
        </div>
        <div class="keys h-20 py-6 bg-yellow-600 rounded-lg text-2xl text-white" @click="submit()">
          OK
        </div>
      </div>
    </div>
    <div class="md:container md:mx-auto text-white mt-2 flex justify-center">
      <div class="keys flex items-center justify-center m-4">
        <div class="text-center bg-yellow-600 text-2xl p-5 w-64 rounded-lg" @click="goBack()">
          {{
            getLang() == 'kz' ? 'Басты бет' : getLang() == 'ru' ? 'Главная страница' : 'Main page'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keys {
  cursor: pointer;
}
</style>
