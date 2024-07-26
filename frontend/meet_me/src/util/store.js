import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_id: ''
            },
            modalOn: false
        }
    },
    mutations: {
        user(state, data){
            state.user = data;
        },
        setModalOn(state) {
            state.modalOn = true;
          },
        setModalOff(state) {
            state.modalOn = false;
        },
        
    },
    getters: {
        getUser: ()=>{
            return this.state.user;
        }
    },
    plugins: [
        persistedstate({
            paths: ['user']
        })
    ]
});

export default store;