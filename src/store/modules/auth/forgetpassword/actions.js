import axios from '../../../../global-axios'

export default {
  postForgetPassword({ commit }, authData) {
    return axios.post('/checkQR', authData)
      .then(response => {
        commit('updateEmail', authData.email)
        commit('updateResponse', response)
      })
      .catch(error => commit('updateErrors', error))
  },
}