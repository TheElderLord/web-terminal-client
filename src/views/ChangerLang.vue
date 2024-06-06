<script>

import { useStateStore } from '../store'


// import img from "./img/icon/paper.png"

export default {
    name: 'change-lang',
    data() {
        return {
            services: '',
        }
    },
    setup() {
        const stateStore = useStateStore()
        return {
            stateStore,
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
        setTicketBody(body) {
            this.stateStore.set_ticket_body(body)
        },
        getLang() {
            return this.stateStore.get_lang
        },
        getiin() {
            return this.stateStore.get_iin
        },

        goToSevicesPage(lang) {
            this.stateStore.set_lang(lang);
            this.$router.push('/index')
        }
    },


    mounted() {


    },

}
</script>
<template>
    <div class=" h-full w-full mx-auto flex ">
        <div class="logo w-full h-full flex justify-center items-center">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="langCont w-full h-full flex justify-center items-center">
            <div class="services ">
                <div @click="goToSevicesPage('kz')"
                    class="service text-white   rounded-lg flex items-center justify-center ">
                    <div class="langIcon"><img src="../assets/kaz.png" alt=""></div>
                    <div class="text-center">
                        Қазақша
                    </div>
                </div>
                <div @click="goToSevicesPage('en')"
                    class="service text-white   rounded-lg flex items-center justify-center ">
                    <div class="langIcon"><img src="../assets/eng.png" alt=""></div>
                    <div class="text-center">
                        Қазақша
                    </div>
                </div>
                <div @click="goToSevicesPage('ru')"
                    class="service text-white   rounded-lg flex items-center justify-center ">
                    <div class="langIcon"><img src="../assets/ru.png" alt=""></div>
                    <div class="text-center">
                        Русский
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.title {
    h1 {
        font-size: 65px;
    }
}

.service {

    cursor: pointer;
    padding: 1rem;
    background-color: #005C54;
    ;
    font-size: 75px;
    margin: 1rem auto;


}
</style>
