<script>
import { useStateStore } from '../store'
export default {
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
        }
    }
}
</script>

<template>
    <div>
        <div class="title text-center">
            {{ getLang() == 'kz' ? 'Жеке куәліктің артқы жағындағы штрих-кодты сканерлеңіз' : getLang() == 'ru' ?
                'Сканируйте штрих-код на обратной стороне удостоверения личности' :
                'Back' }}
        </div>
        <div class="body ">
            <div class="form ">
                <div class="form-wrapper">
                    <div class="form-container ">
                        <input :placeholder="getLang() == 'kz' ? 'Штрих-кодты сканерлеңіз' : getLang() == 'ru' ? 'Отсканируйте штрих-код' :
                            'Submit'" class="" type="text">
                        <img src="../assets/icons/delete.png" alt="">
                    </div>

                </div>
                <div class="submitBut">
                    {{ getLang() == 'kz' ? 'Растау' : getLang() == 'ru' ? 'Подтвердить' :
                        'Submit' }}
                </div>
                <div class="footer">
                    <p>{{ getLang() === "kz" ? "" : `Нажимая кнопку "Подтвердить", я даю свое согласие на сбор,
                        обработку
                        моих персональных данных с целью получения консультации по его услугам`}}</p>
                </div>

            </div>
            <div class="image">
                <img src="../assets/icons/id_card.png" alt="">
            </div>
        </div>
        <div class="footer flex justify-around">
            <div class="backButton w-1/3 text-center">
                
                <div class="text">
                    На главную
                </div>
            </div>
            <div class="arrowDown w-1/3 text-center">
               <div class="text">
                Сканер штрих-кода
               </div>
               
            </div>
            <div class="manual w-1/3 text-center">
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
    width: 100%;
    height: 100%;

    .form {
        width: 50%;
        height: 100%;
        

        .form-wrapper {
            height: 100%;

            .form-container {
                margin: 0 auto;
                display: flex;

                input {
                    margin: 0 auto;
                    border: 1px solid black;
                }
            }


        }

        .submitBut {
            margin-top: 10rem;
            width: fit-content;
            margin: 0 auto;
            padding: .5rem;
            background-color: #00BB00;
            color: white;
            text-align: center;
            font-size: 33px;
        }

    }

    .image {
        width: 50%;
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