import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false });


const whiteList = ['/login', '/auth-redirect'];// no redirect whitelist



router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done()
    } else {
      if(store.getters.addRouters.length>0){
        //有路由直接跳转
        next()
      } else {
        //远程加载路由
        store.dispatch('GetUserInfo').then(res => {
          const  menu=store.getters.menu;
          store.dispatch('GenerateRoutes', menu).then(() => {
                router.addRoutes(store.getters.addRouters);
                next({ ...to, replace: true });
            })
        });
          next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});



router.afterEach(() => {
  NProgress.done() // finish progress bar
});


