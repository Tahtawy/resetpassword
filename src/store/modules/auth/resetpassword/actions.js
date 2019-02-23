import axios from '../../../../global-axios'

export default {
  postResetPassword({ commit }, resetPasswordData) {
    return axios.post('/updatePassword', resetPasswordData)
      .then(response => commit('updateResponse', response))
      .catch(error => commit('updateErrors', error))
  },
}