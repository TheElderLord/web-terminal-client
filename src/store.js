import { defineStore } from "pinia"

export const useStateStore = defineStore('store', {
    state: () => ({ 
        IIN: '', 
        phone: '',
        branch: '',
        queueId: '',
        lang: "kz",
        rating_code: '',
        ticket_body:'',
        message:'Error appeared',
    


     }),
    getters: {
       get_iin(state) {
          
            return state.IIN
        },
        get_phone(state) {
          
            return state.phone
        },
        get_branch(state) {
          
            return state.branch
        },
        get_queueId(state) {
          
            return state.queueId
        },
        get_lang(state){
            return state.lang
        },
        get_rating_code(state){
            return state.rating_code
        },
        get_ticket_body(state){
            return state.ticket_body;
        },
        get_error_message(state){
            return state.message;
        },
      

    },
    
    actions: {
        set_iin(IIN) {
            this.IIN = IIN
        },
        set_phone(phone) {
            this.phone = phone
        },
        set_branch(branch) {
            this.branch = branch
        },
        set_queueId(queueId) {
            this.queueId = queueId
        },
        set_lang(lang){
            this.lang = lang
        },
        set_rating_code(rating_code){
            this.rating_code = rating_code
        },
        set_ticket_body(body){
            this.ticket_body = body;
        },
        set_message(message){
            this.message = message;
        }
    },
  })