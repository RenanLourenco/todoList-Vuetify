
export default {
    namespaced:true,
    state:{
        user:null,
        token:null,
        teste:'teste',
    },
    getters:{
        getUser: state =>{
            return state.user
        }
    },
    mutations:{
        SET_TOKEN(state,payload){
            state.token = payload
        },
        SET_USER(state,payload){
            state.user = payload
        },
        CLEAR_USER(state){
            state.user = null
        }
    },
    actions:{

    },
    modules:{
        
    }
}
