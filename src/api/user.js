import request from '@/utils/request'
// 获取短信验证
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
// 验证登录
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
