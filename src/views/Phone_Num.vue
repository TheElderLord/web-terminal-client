<script>
import { useStateStore } from '../store'
export default {
    data() {
        return {
            phone_number: '',
            error: false
        }
    },
    setup() {
        const stateStore = useStateStore();
        return {
            stateStore
        }
    },
    computed: {
       
    },
    methods: {
        setPhone() {
            this.stateStore.set_phone(this.phone_number);
        },
        getLang() {
            return this.stateStore.get_lang
        },
        addNum(num) {
            if (this.phone_number.length < 11) {
                this.phone_number += num;
            }
            this.phone_number =  this.phone_number.replace(/[^0-9]/g, "")
        },
        delNum() {
            this.phone_number =  this.phone_number.replace(/[^0-9]/g, "")
            this.phone_number = this.phone_number.slice(0, -1);
        },
        submit() {
            if(this.error){
                return;
            }

            if (this.phone_number.length < 11) {
                this.error = true;
                return;
            }
            else {
                this.setPhone
                this.$router.push('/');
            }

        },
        isCorrect() {
            if (this.phone_number.length > 0 && this.phone_number.length < 11 ) {
                return true;
            }
            else if (this.error) {
                return true;
            }
        },
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },


    },
    mounted() {
    document.addEventListener('keydown', (e) => {
        try {
            switch (e.key) {
                case "Backspace":
                    this.delNum();
                    break;
                case "Enter":
                    this.submit();
                    break;
                default:
                this.phone_number =  this.phone_number.replace(/[^0-9]/g, "")
            }
        } catch (err) {
            console.log(err);
        }
    });
}

}
</script>
<template>
    <div class="md:container md:mx-auto p-2">


        <div class="numpad text-center w-3/5 md:mx-auto bg-white bg-opacity-20 rounded-lg p-3">
            <div class="numpadHeader text-center m-3 ">
                <h1 class="text-white text-2xl m-3">{{getLang()==="kz"? "Телефон номерін енгізіңіз"
                    : getLang()==="ru" ? "Введите номер телефона":"Enter the phone number"}}</h1>
                <input type="text" name="IIN" id="IINInp" class="w-full h-12 rounded-md text-xl text-center text-black"
                    v-model="phone_number" maxlength="11">
                <div v-if="isCorrect()" class="error-text text-red-500 text-xl mt-4">{{getLang()==="kz"? "Дурыс емес телефон номері"
                    : getLang()==="ru" ? "Неправильный номер телефона": "Invalid phone number" }}</div>
            </div>
            <div class=" grid grid-cols-3 gap-4 ">
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(1)">1</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(2)">2</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(3)">3</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(4)">4</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(5)">5</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(6)">6</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(7)">7</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(8)">8</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(9)">9</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white flex items-center justify-center"
                    @click="delNum()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="addNum(0)">0</div>
                <div class="keys  h-20 py-6  rounded-lg text-2xl text-white" @click="submit()">OK</div>

            </div>

        </div>
        <div class="md:container md:mx-auto text-white  mt-2 flex justify-center">
            <div class="flex items-center justify-center m-4" @click="goBack()">
                <div class="text-center    text-2xl p-5 w-64 rounded-lg">{{getLang() === "kz"? "Артқа"
                    :getLang() === "ru" ? "Назад" : "Back"}}</div>
            </div>

        </div>
    </div>
</template>


<style  scoped>
.keys {
    cursor: pointer;
    background-color: #00BB00;;

}
</style>

