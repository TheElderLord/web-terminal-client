<script>
import { useStateStore } from '../store'
import { SERVER_HOST } from '../constants'
import { SERVER_PORT } from '../constants'
const branchId = import.meta.env.VITE_SERVER_BRANCH_ID
import axios from 'axios'
export default {
  data() {
    return {
      book_code: '',
      error: false
    }
  },
  setup() {
    const stateStore = useStateStore()
    return {
      stateStore
    }
  },
  computed: {
    setRatingCode() {
      return this.stateStore.set_rating_code(this.book_code)
    }
  },
  methods: {
    getLang() {
      return this.stateStore.get_lang
    },
    addNum(num) {
      if (this.book_code.length < 12) {
        this.book_code += num
      }
      this.book_code = this.book_code.replace(/[^0-9]/g, '')
    },
    delNum() {
      this.book_code = this.book_code.slice(0, -1)
      this.book_code = this.book_code.replace(/[^0-9]/g, '')
    },
    async submit() {
      // if(this.error){
      //     return
      // }
      if (this.book_code == '' || this.book_code == null) {
        this.error = true
        return
      } else {
        try {
          const result = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/rate/check`, {
            ordernum: this.book_code,
            branchId: branchId
          })
          console.log(result.data)
           if (result.data.message === 'Ticket') {
            const ticket = result.data.data
            console.log(ticket)
            if (ticket.State[0] === 'NEW') {
              this.stateStore.set_message(
                'RU=Билет еще не обслужен;KZ=Билет әлі қызмет көрсетілмеген;EN=The ticket has not been serviced yet')
              return this.$router.push('/messages')
            } else if (ticket.State[0] === 'INSERVICE') {
                this.stateStore.set_message(
                'RU=Билет еще не обслужен;KZ=Билет әлі қызмет көрсетілмеген;EN=The ticket has not been serviced yet')
                 return this.$router.push('/messages')
            }
            else if(ticket.Rating[0] !== ""){
                this.stateStore.set_message(
                'RU=Билет уже оценен;KZ=Билетке баға қойылған;EN=Ticket is reported already')
                 return this.$router.push('/messages')
            }
            

            this.stateStore.set_rating_code(this.book_code)
            this.$router.push('/rate')
          }
        } catch (err) {
            
          console.log(err)
          this.stateStore.set_message(
              'RU=Билет не найден.;KZ=Билет табылмады;EN=Ticket is not found'
            )
            return this.$router.push('/messages')
        }
      }

      //   this.stateStore.set_rating_code(this.book_code)
      //   this.$router.push('/rate')
    },
    // isCorrect() {
    //     if (this.book_code.length > 0 && this.book_code.length < 12 || this.book_code.length > 12) {
    //         return true;
    //     }
    //     else if (this.error) {
    //         return true;
    //     }
    // },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
          this.book_code = this.book_code.replace(/[^0-9]/g, '')
      }
    })
  }
}
</script>
<template>
  <div class="md:container md:mx-auto p-2">
    <div class="numpad text-center w-3/5 md:mx-auto bg-white bg-opacity-20 rounded-lg p-2">
      <div class="numpadHeader text-center m-3">
        <h1 class="text-white text-2xl m-3">
          {{
            getLang() === 'kz'
              ? 'КОД енгізіңіз'
              : getLang() === 'ru'
              ? 'Введите код'
              : 'Enter the code'
          }}
        </h1>
        <input
          type="text"
          name="IIN"
          id="IINInp"
          class="w-full h-12 rounded-md text-xl text-center"
          v-model="book_code"
        />
        <div v-if="error" class="error-text text-red-500 text-xl mt-2">
          {{
            getLang() === 'kz'
              ? 'Дұрыс емес код'
              : getLang() === 'ru'
              ? 'Неверный код'
              : 'Invalid code'
          }}
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

    <div class="md:container md:mx-auto text-white mt-3 flex justify-center">
      <div class="keys flex items-center justify-center m-4" @click="goBack()">
        <div class="text-center bg-yellow-600 text-xl p-5 rounded-lg w-64">
          {{ getLang() === 'kz' ? 'Артқа' : getLang() === 'ru' ? 'Назад' : 'Back' }}
        </div>
      </div>
    </div>
  </div>
</template>


<style  scoped>
.keys {
  cursor: pointer;
}
</style>

