import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import login from './modules/login'
import createVuexPersisted from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    login,
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer(state) {
        return {
          login: {
            token: state.login.token,
          },
        }
      },
    }),
  ],
})

export default store
