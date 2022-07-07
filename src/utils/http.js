import axios  from "axios";
import {getStore} from '@/utils/storage.js'
// axios.defaults.baseURL='http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://47.101.41.175:3000'
axios.interceptors.request.use(config => {
    const userInfo = JSON.parse(getStore('userInfo'))
    if(userInfo){
      let token = userInfo.token
      if (token) {
        config.headers.common.Authorization = token
      }
    }
    return config
  }, error => {
    return Promise.reject(error)
  })