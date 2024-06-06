import { defineStore } from "pinia"

export const useStateStore = defineStore('store', {
    state: () => ({ 
        IIN: '', 
        phone: '',
        branch: '',
        queueId1: '',
        queueId2: '',
        queueId3: '',
        queueId4: '',
        lang: "kz",
        rating_code: '',
        ticket_body:'',
        request_body:'',
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
        get_queueId1(state) {
          
            return state.queueId1
        },
        get_queueId2(state) {
          
            return state.queueId2
        },
        get_queueId3(state) {
          
            return state.queueId3
        },
        get_queueId4(state) {
          
            return state.queueId4
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
        get_request_body(state){
            return state.request_body;
        }
      

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
        set_queueId1(queueId1) {
            this.queueId1 = queueId1
        },
        set_queueId2(queueId2) {
            this.queueId2 = queueId2
        },
        set_queueId3(queueId3) {
            this.queueId3 = queueId3
        },
        set_queueId4(queueId4) {
            this.queueId4 = queueId4
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
        },
        set_request_body(request_body){
            this.request_body = request_body
        }
    },
  })