import Vue from 'vue'
import Vuex from 'vuex'
import ForgetPassword from './store/modules/auth/forgetpassword/forget-store'
import ResetPassword from './store/modules/auth/resetpassword/reset-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    forget_password: ForgetPassword,
    reset_password: ResetPassword
  },
})