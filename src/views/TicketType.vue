<script>
import { useStateStore } from '../store'
import axios from 'axios';
import { SERVER_HOST,SERVER_PORT } from '../constants'


export default {
    name: 'TicketType',
    data() {
        return {}
    },
    setup() {
        const stateStore = useStateStore()
        return {
            stateStore,
        }
    },
    methods: {
        getlang() {
            return this.stateStore.get_lang
        },
        goQR() {
            // this.sendEvent()
            this.$router.push('/qr-ticket')
        },
        goPrint() {
            this.sendEvent()
            this.$router.push('/print')
        },
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        async sendEvent() {
            const requestBody = this.stateStore.get_request_body;
            requestBody.channel = "terminal"
            const response = await axios.post(
                `http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/event-now`,
                requestBody
            )
            console.log('Response', response)
            if (response.data.message == 'Success') {
                this.stateStore.set_ticket_body(response.data.data)
                console.log(this.stateStore.get_ticket_body)
                // this.$router.push('/ticket-info')
            } else {
                console.error('Error in API response:', response.data.message)
            }
        },
        goMain() {
            this.$router.push('/')
        },
    },
    mounted() {
        this.checkRouteInterval = setInterval(() => {
            const currentPath = this.$route.path

            // Check if the route is '/rate'
            if (currentPath === '/booking') {
                //   console.log('Line 92 redirect rate page');
                this.goMain()

                // Clear the interval if the condition is met
                clearInterval(this.checkRouteInterval)
            }
        }, 24000)
    },
    beforeUnmount() {
        clearInterval(this.checkRouteInterval)
    },
}
</script>

<template>
    <div class=" mx-auto">
        <div class="text-white text-4xl  w-full rounded-lg flex justify-center items-center">
            {{ getlang() === 'kz' ? 'Броньдау' : getlang() === 'ru' ? 'Бронирование' : 'Reservation' }}
        </div>
        <div class="options mx-auto text-center p-2 mt-10 ">
            <div class="option text-white text-3xl  p-5  w-full rounded-lg flex justify-center items-center"
                @click="goQR()">
                <div class="in text-center">
                    {{
                        getlang() === 'kz' ? 'QR' : getlang() === 'ru' ? 'QR' : 'Reservation'
                    }}
                </div>
            </div>
            <div class="option text-white text-3xl my-4 p-5 h-full  w-full rounded-lg flex justify-center items-center"
                @click="goPrint()">
                <div class="in text-center">
                    {{
                        getlang() === 'kz'
                            ? 'Басып шығару'
                            : getlang() === 'ru'
                                ? 'Распечатать'
                                : 'Receive the reserved ticket'
                    }}
                </div>
            </div>
            <div class="option text-white text-3xl my-10 p-5  w-full rounded-lg flex justify-center items-center"
                @click="goBack()">
                <div class="in text-center">
                    {{ getlang() === 'kz' ? 'Артқа' : getlang() === 'ru' ? 'Назад' : 'Back' }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.option {
    cursor: pointer;
    background-color: #00BB00;
    font-size: 43px;
}
</style>
