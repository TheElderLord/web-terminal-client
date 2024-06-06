<script>
import { useStateStore } from '../store'
export default {
    data() {
        return {
            IIN: "",
            error: false
        }

    },
    setup() {
        const stateStore = useStateStore()
        return {
            stateStore,
        }
    },
    methods: {
        validateIIN(iin) {
            // Regular expression for a 12-digit number
            const iinRegex = /^\d{12}$/

            if (!iinRegex.test(iin)) {
                return false
            }

            const year = parseInt(iin.substr(0, 2), 10)
            const month = parseInt(iin.substr(2, 2), 10)
            const day = parseInt(iin.substr(4, 2), 10)
            //   console.log(year, month, day)
            // Validate date of birth
            if (year < 0 || year > 99 || month < 1 || month > 12 || day < 1 || day > 31) {
                return false
            }
            return true


        },
        getLang() {
            console.log(this.stateStore.get_lang)
            return this.stateStore.get_lang;
        },
        manualIInPage() {
            this.$router.push("/iin")
        },
        goMain() {
            this.stateStore.set_iin(this.IIN);
            this.$router.push('/')
        },
        clearForm() {
            this.IIN = "";
        },
        submit() {
            try {
                if (this.IIN.length !== 12 || !this.validateIIN(this.IIN)) {
                    this.error = true
                    return
                }

                if (this.IIN.length !== 12) {
                    this.error = true
                    return
                }
                this.error = true
                this.stateStore.set_iin(this.IIN)
                this.$router.push('/index2')
            } catch (err) {
                console.log(err)
            }
        },
        isCorrect() {
            if ((this.IIN.length > 0 && this.IIN.length < 12) || this.IIN.length > 12) {
                return false
            } else if (this.error) {
                return false
            }
            return true
        },
        setIIN() {
            try {
                this.stateStore.set_iin(this.IIN)
            } catch (err) {
                return console.log(err)
            }
        },
    },
    mounted() {
        document.getElementById("scannerInput").focus()
    }
}
</script>

<template>
    <div class="w-full h-full">
        <div class="title ">
            {{ getLang() == 'kz' ? 'Жеке куәліктің артқы жағындағы штрих-кодты сканерлеңіз' : getLang() == 'ru' ?
                'Сканируйте штрих-код на обратной стороне удостоверения личности' :
                'Back' }}
        </div>
        <div class="body ">
            <div class="form ">
                <div>
                <div class="form-container ">
                    <div class="iin-input">
                        <input v-model="IIN" id="scannerInput" :placeholder="getLang() == 'kz' ? 'Штрих-кодты сканерлеңіз' : getLang() == 'ru' ? 'Отсканируйте штрих-код' :
                            'Submit'" class="p-2" type="text">
                        <div v-if="!isCorrect()" class="error-text text-red-500 text-xl mt-2 mb-0 p-0">
                            {{
                                getLang() === 'kz'
                                    ? 'Дұрыс емес ЖСН'
                                    : getLang() === 'ru'
                                        ? 'Неправильный ИИН'
                                        : 'Invalid IIN'
                            }}
                        </div>
                    </div>
                    <div @click="clearForm()" class="iin-image cursor-pointer">
                        <img src="../assets/icons/delete.png" alt="">
                    </div>

                </div>
                <div @click="submit()" class="submitBut cursor-pointer">
                    {{ getLang() == 'kz' ? 'Растау' : getLang() == 'ru' ? 'Подтвердить' :
                        'Submit' }}
                </div>



                <div class="body-footer text-black text-center p-4 ">
                    <p class="font-bold">{{ getLang() === "kz" ? `"Растау" батырмасын басу арқылы мен жинауға
                        келісімімді беремін,
                        өңдеу
                        оның қызметтері бойынша кеңес алу мақсатында менің дербес деректерім` : `Нажимая кнопку
                        "Подтвердить", я даю свое согласие на сбор,
                        обработку
                        моих персональных данных с целью получения консультации по его услугам`}}</p>
                </div>
            </div >
            </div>
            <div class="image w-full h-full">
                <img src="../assets/icon/id.png" alt="" >
            </div>
        </div>
        <div class="footer flex justify-around ">
            <div @click="goMain()" class="backButton w-1/3 text-center cursor-pointer">

                <div class="text">
                    <i class="bi bi-arrow-return-left text-5xl text-blue-600"></i>
                    {{ getLang() == 'kz' ? 'Басты бетке' : getLang() == 'ru' ? ' На главную' :
                    'Back' }}
                </div>
            </div>
            <div class="arrowDown w-1/3  text-center">
                <div class="text">
                    
                    {{ getLang() == 'kz' ? 'Штрих-кодты сканерлеу' : getLang() == 'ru' ? 'Сканер штрих-кода' :
                    'Back' }}
                </div>
                <i class="bi bi-chevron-down font-bold  text-blue-600"></i>

            </div>
            <div @click="manualIInPage()"
                class="manual w-1/3 text-center flex justify-center items-center cursor-pointer">
                {{ getLang() == 'kz' ? 'Қолмен ЖСН-ді теру' : getLang() == 'ru' ? 'Ручной ввод ИИН' :
                'Back' }}
            </div>
        </div>
    </div>

</template>
<style lang="scss" scoped>
.title {
    color: #00BB00;
    font-size: 43px;
    font-weight: 700;
    width: 100%;
    height: 10%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.body {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60%;

    .footer {
        color: #00BB00;
    }

    .form {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;


        .form-container {
            width: fit-content;
            margin: 0 auto;
            display: flex;

            .iin-input {
                input {
                    width: 24rem;
                    font-size: 32px;
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
        img{
            width: 80%;
            margin-bottom: 3rem;
        }
    }
}

.footer {
    width: 100%;
    height: 100px;
    color: #00BB00;
    position: absolute;
    top: 85%;

    .backButton {
        .text {
            font-size: 40px;
            font-weight: 700;
        }

        i {
            font-size: 60px;
        }

    }

    .arrowDown {
        .text {
            font-size: 42px;
            font-weight: 700;
        }

        i {
            font-size: 100px;
        }

    }

    .manual {
        display: flex;
        color: white;
        font-size: 36px;
        font-weight: 500;
        background-color: #00BB00;
    }
}
</style>