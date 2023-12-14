<script>
import axios from 'axios'
import { useStateStore } from '../store'

export default {
    data() {
        return {
            resp: '',
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    methods: {
        getBranchId() {
            return this.stateStore.get_branch
        },
        getQueueid() {
            return this.stateStore.get_queueId;
        },
        getLang() {
            return this.stateStore.get_lang
        },
        getiin() {
            return this.stateStore.get_iin
        },
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        async print() {
            const response = await axios.post(`http://localhost:3000/event-now/print`,this.resp);
            if(response.status === 200)
            this.$router.push('/print')
        },

        async sendEvent() {
            try {
                const branchId = this.getBranchId() ? this.getBranchId() : '?';
                const queueId = this.getQueueid() ? this.getQueueid() : '?';
                const iin = this.getiin() ? this.getiin() : '?';
                const local = this.getLang();
                const body = {
                    branchId: branchId,
                    queueId: queueId,
                    iin: iin,
                    local: local
                }
                console.log(body);

                const response = await axios.post(`http://localhost:3000/event-now`, body);

                if (response.data.message === 'Success') {
                    this.resp = response.data.data;
                    console.log(this.resp);
                } else {
                    console.error('Error in API response:', response.data.message);
                }
            } catch (error) {
                console.error('Error in API request:', error);
            }
        },



    },
    mounted() {
        this.sendEvent();
    },

}
</script>
<template>
    <div class="md:container mx-auto p-4 text-center  bg-white bg-opacity-10 ">
        <div v-if="resp" class="infos w-3/5    mx-auto rounded-lg p-5">
            <div class="info text-white   flex justify-center items-center py-3">
                <div class="in text-center text-5xl leading-normal">{{ resp["cus:ticketno"][0] }}</div>
            </div>
            <div class="info text-white   flex justify-center items-center py-3">
                <div class="in text-center text-2xl leading-normal">{{ resp["cus:servicename"][0] }}</div>
            </div>
            <div class="info text-white  flex justify-center items-center py-3">
                <div class="in text-center text-2xl leading-normal">Код для оценки: {{ resp["cus:ordernum"][0] }}</div>
            </div>
        </div>
        <div class="buttons w-2/5 mx-auto mt-8">
            <div class="button text-white text-3xl bg-yellow-600 my-4 py-5 rounded-lg" @click="print()">
                 {{getLang()==="kz"?"Басып шығару":getLang()==="ru"?"Распачатать": "Print"}}</div>
            <div class="button text-white text-3xl bg-yellow-600 my-4 py-5 rounded-lg" @click="goBack()">
                {{ getLang()==="kz"?"Артқа":getLang()==="ru"?"Назад":"Back" }}    
            </div>
        </div>
    </div>
</template>

<style scoped>
.button {
    cursor: pointer;
}
</style>