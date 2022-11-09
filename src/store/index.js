import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'


Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        token:null,
        user:null,
        teste:'teste',
    },
    mutations:{
        
    },
    getters:{
        getUser: state =>{
            return state.user
        }
    },
    actions:{
        
    },
    modules:{
        auth
    }
})
