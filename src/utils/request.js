// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}) // 创建一个axios的实例
service.interceptors.request.use() // 请求拦截器
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 验证码响应特殊情况 单独响应
    const id = store.state.login.imgCode
    if (res.config.url === `/api/user-service/user/imageCode/${id}`) {
      return res.request.responseURL
    }
    const { success, msg } = res.data
    // 登录成功或失败返回信息 success 表示登陆成功或失败
    if (success) {
      Message.success(msg)
      return res.data
    }
    // 如果失败 提示用户失败原因并且抛出错误
    Message.error(msg)
    return Promise.reject(new Error(msg))
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message.error(error.response.data)
    return Promise.reject(error)
  },
)
export default service // 导出axios实例
