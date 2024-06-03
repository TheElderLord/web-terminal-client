<script>
import { useStateStore } from '../store'
export default {
    data(){
        return{
            scannerInput:""
        }
        
    },
    setup() {
        const stateStore = useStateStore()
        return {
            stateStore,
        }
    },
    methods: {
        getLang() {
            console.log(this.stateStore.get_lang)
            return this.stateStore.get_lang;
        },
        manualIInPage(){
            this.$router.push("/iin")
        },
        goMain(){
            this.stateStore.set_iin(this.scannerInput);
            this.$router.push('/')
        },
        clearForm(){
           this.scannerInput = "";
        }
    },
    mounted(){
        document.getElementById("scannerInput").focus()
    }
}
</script>

<template>
    <div>
        <div class="title text-center p-4">
            {{ getLang() == 'kz' ? 'Жеке куәліктің артқы жағындағы штрих-кодты сканерлеңіз' : getLang() == 'ru' ?
                'Сканируйте штрих-код на обратной стороне удостоверения личности' :
                'Back' }}
        </div>
        <div class="body ">
            <div class="form ">
               
                    <div class="form-container ">
                        <div class="iin-input">
                            <input v-model="scannerInput" id="scannerInput" :placeholder="getLang() == 'kz' ? 'Штрих-кодты сканерлеңіз' : getLang() == 'ru' ? 'Отсканируйте штрих-код' :
                            'Submit'" class="p-2" type="text">
                        </div>
                       <div @click="clearForm()" class="iin-image cursor-pointer">
                        <img src="../assets/icons/delete.png" alt="">
                       </div>
                      
                    </div>
                    <div class="submitBut">
                        {{ getLang() == 'kz' ? 'Растау' : getLang() == 'ru' ? 'Подтвердить' :
                            'Submit' }}
                    </div>

                
               
                <div class="footer text-black text-center p-4 ">
                    <p class="font-bold">{{ getLang() === "kz" ? `"Растау" батырмасын басу арқылы мен жинауға келісімімді беремін,
                        өңдеу
                        оның қызметтері бойынша кеңес алу мақсатында менің дербес деректерім` : `Нажимая кнопку "Подтвердить", я даю свое согласие на сбор,
                        обработку
                        моих персональных данных с целью получения консультации по его услугам`}}</p>
                </div>

            </div>
            <div class="image w-full h-full">
                <img src="../assets/icons/id_card.png" alt="">
            </div>
        </div>
        <div class="footer flex justify-around">
            <div @click="goMain()" class="backButton w-1/3 text-center cursor-pointer">
                    
                <div class="text">
                    <i class="bi bi-arrow-return-left text-3xl text-blue-600"></i>
                    На главную
                </div>
            </div>
            <div class="arrowDown w-1/3 text-center">
               <div class="text">
                Сканер штрих-кода
               </div>
               <i class="bi bi-chevron-down font-bold text-5xl text-blue-600"></i>
               
            </div>
            <div @click="manualIInPage()" class="manual w-1/3 text-center flex justify-center items-center cursor-pointer">
                Ручной ввод ИИН
            </div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
.title {
    color: #00BB00;
    font-size: 32px;
    font-weight: 700;
}

.body {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .form {
        width: 100%;
        height: 100%;
        
    

            .form-container {
                width: fit-content;
                margin: 0 auto;
                display: flex;
                .iin-input{
                    input {
                        width: 24rem;
                        height: 100%;
                        margin: 0 auto;
                        border: 1px solid black;
                    }
                }
               
            }


        

        .submitBut {
          
            width: fit-content;
            margin: 4rem auto 0 auto;
            padding: .5rem;
            background-color: #00BB00;
            color: white;
            text-align: center;
            font-size: 33px;
            border-radius: .5rem;
        }

    }

    .image {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.footer{
    color: #00BB00;
    
    .backButton{
        .text{
            font-size: 25px;
            font-weight: 700;
        }
        
    }
    .arrowDown{
        .text{
            font-size: 32px;
            font-weight: 700;
        }
       
    }
   .manual{
    
    color: white;
    font-size: 18px;
    font-weight: 500;
    background-color: #00BB00;
   }
}
</style>