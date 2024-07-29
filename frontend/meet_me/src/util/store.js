import { createStore } from 'vuex'

import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {
                user_id: ''
            },
            modalOn: false,
            modalOn2: false,
            modalOn3: false
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
        setModalOn2(state) {
            state.modalOn2 = true;
          },
        setModalOff2(state) {
            state.modalOn2 = false;
        },
        setModalOn3(state) {
            state.modalOn3 = true;
        },
        setModalOff3(state) {
            state.modalOn3 = false;
        }
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