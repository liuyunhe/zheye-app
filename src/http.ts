import axios from 'axios'
import { nextTick } from 'vue'
import store from "./store";

axios.defaults.baseURL = '/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false })
  return config
})
axios.interceptors.response.use(
  config => {
    nextTick(() => {
      store.commit('setLoading', false)
    })
    return config
  },
  e => {
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    nextTick(() => {
      store.commit('setLoading', false)
    })
    return Promise.reject(error)
  })

export default axios
