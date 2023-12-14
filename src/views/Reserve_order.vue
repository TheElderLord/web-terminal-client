<script>
import { useStateStore } from '../store';
import axios from 'axios'
export default {
    data(){
        return{
            webServices:[],
            queuId:25614,
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    methods:{
        async getWebServices() {
            const response = await axios.get(`http://localhost:3000/booking?branchId=${this.stateStore.get_branch}`)
            this.services = response.data.data;

        },
    }

}
</script>
<template>
    <div class="md:container mx-auto">
        <div class="form">
            <div class="title text-white text-2xl text-center">Reserve Order
                <h1 class="text-white text-3xl">{{queuId}}</h1>
            </div>
            
            <div class="field">
                
                <select name="webServices" id="sel" v-model="queuId">
                    <option :value="i" v-for="i in 50" :key="i">
                        {{ i }}
                    </option>
                </select>
            </div>
        </div>

    </div>
   
</template>