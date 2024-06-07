<script>
import { useStateStore } from '../store'
// import axios from 'axios';
import QRCode from 'qrcode';
import axios from 'axios';
import { SERVER_HOST, SERVER_PORT, QR_URL,QR_IDLE, SHOW_RATING } from '../constants'
export default {
    name: 'QRTicket',
    data() {
        return {
            text: '',
        }
    },
    setup() {
        const stateStore = useStateStore()
        const ticketBody = stateStore.get_ticket_body;
        return {
            stateStore,
            ticketBody
        }
    },
    methods: {
        async sendEvent() {
            const requestBody = this.stateStore.get_request_body;
            requestBody.channel = "terminal_qr"
            const response = await axios.post(
                `http://${SERVER_HOST}:${SERVER_PORT}/api/v1/services/event-now`,
                requestBody
            )
            console.log('Response', response)
            if (response.data.message == 'Success') {
                // this.stateStore.set_ticket_body(response.data.data)
                // console.log(this.stateStore.get_ticket_body)
                await this.generateQrCode(response.data.data)
                // this.$router.push('/ticket-info')
            } else {
                console.error('Error in API response:', response.data.message)
            }
        },
        getTicketBody() {
            return this.stateStore.get_ticket_body;
        },
        async generateQrCode(ticketBody) {
            try {
                let qrURL = QR_URL;
                // const ticketBody = this.ticketBody;
                // console.log(ticketBody)
                // const ticketNumber = 3123
                // const serviceName = "dsadas"
                // const ordernum = 123123;
                const ticketNumber = ticketBody['cus:ticketno'][0]
                const serviceName = ticketBody['cus:servicename'][0];
                
                const ordernum = ticketBody['cus:ordernum'][0];
                const proposal = ticketBody['cus:proposaltime'][0];
                const time = new Date().toLocaleString();
                qrURL += `?servicename=${serviceName}&time=${time}&number=${ticketNumber}&waittime=${proposal}&lang=${this.stateStore.get_lang}`;
                if(SHOW_RATING === "true"){
                    qrURL+= `&order=${ordernum}`;
                }
                const canvas = this.$refs.canvas;

                const options = {
                    width: 500,
                    height: 500,
                };
                await QRCode.toCanvas(canvas, qrURL, options);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        },
        goMain() {
            this.$router.push('/')
        }
    },
    mounted() {
        this.sendEvent();
        this.checkRouteInterval = setInterval(() => {
            const currentPath = this.$route.path

            // Check if the route is '/rate'
            if (currentPath === '/qr-ticket') {
                // console.log('Line 125 redirect index page')
                this.goMain()

                // Clear the interval if the condition is met
                clearInterval(this.checkRouteInterval)
            }
        }, QR_IDLE)
    },

    beforeUnmount() {
        // Clear the interval when the component is about to be unmounted
        clearInterval(this.checkRouteInterval)
    },

}
</script>
<template>
    <main class="h-full w-full">
        <div class="container h-f">
            <div class="title">QR</div>
            <div class="generator w-full  text-center flex justify-center ">
                <canvas ref="canvas"></canvas>
            </div>
            <div class="footer text-center">
                <button @click="goMain()">В главную</button>
            </div>
        </div>
    </main>
</template>
<style lang="scss" scoped>
main {
    display: flex;
    justify-content: center;

}

.footer {
    margin-top: 20%;
    font-size: 43px;
}

.footer button {
    padding: 1.5rem;
    color: white;
    border-radius: 1rem;
    background-color: #00BB00;
    ;
}

canvas {
    width: 500px;
    height: 500px;
}

.title {
    text-align: center;
    font-size: 64px;
}
</style>