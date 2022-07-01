import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})
export default request

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
//   return config
// }, function (error) {
// 对请求错误做些什么
//   return Promise.reject(error)
// })

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
// 对响应数据做点什么
//   return response
// }, function (error) {
// 对响应错误做点什么
//   return Promise.reject(error)
// })
