                <script>
                import axios from 'axios'
                import { useStateStore } from '../store'
                import { BRANCH_ID } from '../constants'
                import { SERVER_HOST } from '../constants'
                import { SERVER_PORT } from '../constants'
          

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
                      this.stateStore.set_queueId3(id)
                    },
                    getLang() {
                      return this.stateStore.get_lang
                    },
                    getQueueId() {
                      return this.stateStore.get_queueId2
                    },
                    async getServices() {
                      console.log(this.getQueueId())
                      try {
                        const response = await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services`, {
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
                    setTicketBody(body) {
                      this.stateStore.set_ticket_body(body)
                    },
                    async goNext(service) {
                      // console.log(service)
                      try {
                        if (
                          service.maxServTime[0] === '' ||
                          service.maxServTime[0] === null ||
                          service.maxServTime[0] === undefined ||
                          service.maxServTime[0] === '#max_serv_time#'
                        ) {
                          this.setBranchId(BRANCH_ID)
                          this.setQueueId(service.queueId[0])
                          this.$router.push('/index3')
                          return
                        } else {
                          try {
                            const branchId = BRANCH_ID
                            const queueId = service.queueId[0]
                            const iin = this.stateStore.get_iin ?? "?"
                            const local = this.getLang()
                            const requestBody = {
                              branchId: branchId,
                              queueId: queueId,
                              iin: iin,
                              local: local
                            }
                            this.stateStore.set_request_body(requestBody);
                            this.$router.push('/ticket-type')
                            // console.log(body);

                            // const response = await axios.post(
                            //   `http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/event-now`,
                            //   requestBody
                            // )
                            // console.log('Response', response)
                            // if (response.data.message == 'Success') {
                            //   this.setTicketBody(response.data.data)
                            //   this.$router.push('/ticket-info')
                            // } else {
                            //   console.error('Error in API response:', response.data.message)
                            // }
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
                       this.$router.push('/')
                    }
                  },
                  mounted() {
                    this.getServices()
                    // this.checkRouteInterval = setInterval(() => {
                    //   const currentPath = this.$route.path

                    //   // Check if the route is '/rate'
                    //   if (currentPath === '/index2') {
                    //     // console.log('Line 116 redirect index2 page')
                    //     this.goMain()

                    //     // Clear the interval if the condition is met
                    //     clearInterval(this.checkRouteInterval)
                    //   }
                    // }, 24000)
                  },
                  beforeUnmount() {
                    // Clear the interval when the component is about to be unmounted
                    clearInterval(this.checkRouteInterval)
                  }
                }
</script>
<template>
  <div class="md:container mx-auto w-full h-full">
    <div class="services flex justify-center flex-wrap flex-row  p-4 w-full h-2/5">
      <div v-for="service in services" :key="service.id" @click="goNext(service)" :class="service.cssclass[0]"
        class="service text-white text-xl  rounded-lg flex  basis-5/12  m-2 h-2/5">
        <div v-if="service.cssclass[0]!=='' &&  service.cssclass[0]!=='mbutton'" class="icon">

        </div>
        <div :style="{ width: service.cssclass[0] !== '' && service.cssclass[0] !== 'mbutton' ? '70%' : '100%' }" class="text-center serviceName">{{ getFormatService(service.workName[0]) }}</div>
      </div>
      <!-- <div class="service accounts text-white text-xl  rounded-lg flex  basis-5/12  m-2">
        <div class="icon">

        </div>
        <div class="text-center serviceName">dsadasd</div>
      </div>
      <div class="service add-deposit text-white text-xl  rounded-lg flex  basis-5/12  m-2">
        <div class="icon">

        </div>
        <div class="text-center serviceName">dsadasd</div>
      </div> -->


      <!-- <div 
                class="service text-white text-xl  bg-yellow-600  rounded-lg flex items-center justify-center basis-5/12 py-4 m-2">
                <div class="text-center">{{ getLang() === "kz" ? "Kazakh" : getLang() === "ru" ? "Russia" :"England" }}</div>
            </div> -->
    </div>
    <div class="footer flex mt-20">
      <div class="backButton">
        <button class="rounded-lg" @click="goBack()">
          <i class="bi bi-arrow-left"></i>
          <span class="px-4"> {{ getLang() == 'kz' ? 'Артқа' : getLang() == 'ru' ? 'Назад' :
            'To main' }}</span>
        </button>
      </div>
      <div class="backButton">
        <button class="rounded-lg" @click="goMain()">
          <i class="bi bi-arrow-return-left"></i>
          <span class="px-4"> {{ getLang() == 'kz' ? 'Басты бетке' : getLang() == 'ru' ? 'На главную' :
            'To main' }}</span>
        </button>
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
.service {
  width: 100%;
  
  cursor: pointer;
  line-height: 1;
  padding: 1rem;
  background-color: #00BB00;


  .icon {
    width: 30%;
    height: 100%;
    margin-right: .5rem;
  }

  .serviceName {
    
    height: 100%;
    display: flex;
    font-size: 43px;
    justify-content: center;
    align-items: center;
  }
}

.footer {
  position: absolute;
  top: 85%
}

.backButton {
  button {
    color: #00BB00;

    padding: 1rem;
    font-size: 32px;

    i {
      color: blue;
    }
  }

}



.accounts .icon {
  background-image: url('../assets/icon/accounts.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}

.add-deposit .icon {
  background-image: url('../assets/icon/add_deposit.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.additional .icon {
  background-image: url('../assets/icon/additional.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.cash_op .icon {
  background-image: url('../assets/icon/cash_op.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.close_deposit .icon {
  background-image: url('../assets/icon/close_deposit.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.coins .icon {
  background-image: url('../assets/icon/coins.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.consult .icon {
  background-image: url('../assets/icon/consult.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.convert_deposit .icon {
  background-image: url('../assets/icon/convert_deposit.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.curr_control .icon {
  background-image: url('../assets/icon/curr_control.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.deposits .icon {
  background-image: url('../assets/icon/deposits.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.documentary .icon {
  background-image: url('../assets/icon/documentary.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.eskrou .icon {
  background-image: url('../assets/icon/eskrou.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.gold .icon {
  background-image: url('../assets/icon/gold.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.loans .icon {
  background-image: url('../assets/icon/loans.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.nonalocated .icon {
  background-image: url('../assets/icon/nonalocated.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.open_depos .icon {
  background-image: url('../assets/icon/open_depos.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.payment_cards .icon {
  background-image: url('../assets/icon/payment_cards.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.reorder_deposit .icon {
  background-image: url('../assets/icon/reorder_deposit.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.safe_cells .icon {
  background-image: url('../assets/icon/safe_cells.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.safe .icon {
  background-image: url('../assets/icon/safe.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.save_acc .icon {
  background-image: url('../assets/icon/save_acc.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.sber_online .icon {
  background-image: url('../assets/icon/sber_online.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.solve .icon {
  background-image: url('../assets/icon/solve.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.spravka .icon {
  background-image: url('../assets/icon/spravka.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.transfers .icon {
  background-image: url('../assets/icon/transfers.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.withdraw_deposit .icon {
  background-image: url('../assets/icon/withdraw_deposit.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}

</style>