import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 储存tokenTime
export function setTokenTime() {
  Cookies.set('tokenTime', Date.now())
}
// 获取tokenTime
export function getTokenTime() {
  return Cookies.get('tokenTime')
}
