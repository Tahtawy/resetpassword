import axios from 'axios'

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
})

export default globalAxios