import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  const token = store.state.login.token
  // 判断用户是否登录
  if (token) {
    //   登录
    //   如果要前往login页面 强制跳转回主页
    if (to.path === '/login') return next('/')
    //   其他页面 放行
    next()
  } else {
    //   未登录
    const Cludes = whiteList.includes(to.path)
    //   如果要前往的页面在白名单中 放行
    if (Cludes) return next()
    //   未在白名单中 强制跳转回登录页面
    next('/login')
  }
})
