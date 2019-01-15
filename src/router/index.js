import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'tq-dashboard', noCache: true }
      }
    ]
  },
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/account',
        component: Layout,
        name: 'account',
        noCache: true,
        meta: {
            title: '系统管理',
            icon: 'tq-yonghuguanli',
            roles: ['superuser', 'admin']
        },
        children: [
            { path: 'user', component: () => import('@/views/account/user'), name: 'user', noCache: true, meta: { title: '用户', icon: 'tq-yonghuguanli' }},
            { path: 'role', component: () => import('@/views/account/role'), name: 'role', meta: { title: '角色', icon: 'tq-jiaoseshezhi' }},
            { path: 'permission', component: () => import('@/views/account/permission'), name: 'permission', meta: { title: '权限', icon: 'tq-quanxian1' }}
        ]
    },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     }
  //   ]
  // },

  {



    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'tq-icon', noCache: true }
      }
    ]
  },
    {
        path: '/shop',
        component: Layout,
        name: 'shop',
        meta: { title: 'Goods', icon: 'tq-shop' },
        children: [
            { path: 'course', name: 'course', component: () => import('@/views/shop/course'), meta: { title: '课程', icon: 'tq-kecheng' }},
            { path: 'category', name: 'category', component: () => import('@/views/shop/category'), meta: { title: '分类', icon: 'tq-category' }},
            // { path: 'funserver', name: 'FunServer', component: () => import('@/views/shop/funlist'), meta: { title: 'funserver', icon: 'form' }},
            // { path: 'imoocedit/:id(\\d+)', name: 'imoocedit', hidden: true, component: () => import('@/views/shop/imoocedit'), meta: { title: 'Edit', icon: 'tree' }},
            { path: 'qiaohuorder', name: 'QiaohuOrder', component: () => import('@/views/shop/qiaohuOrder'), meta: { title: '巧虎订单', icon: 'tq-ertong' }},
            { path: 'qiaohurecord', name: 'QiaohuRecordd', component: () => import('@/views/shop/qiaohuRecord'), meta: { title: '巧虎任务执行', icon: 'tq-ertong' }},
            // { path: 'yunpan', name: 'yunpan', component: () => import('@/views/shop/yunpan'), meta: { title: '云盘精灵', icon: '网盘' }},
            // { path: 'taobaocourse', name: 'taobaocourse', component: () => import('@/views/shop/taobaoCourse'), meta: { title: 'taobaocourse', icon: 'form' }},
            { path: 'weiboapi', name: 'WeiboApi', component: () => import('@/views/shop/weiboapi'), meta: { title: 'WeiboApi', icon: 'tq-weibo' }},
            // { path: 'sexx', name: 'sexx', component: () => import('@/views/shop/sexx'), meta: { title: '蝌蚪', icon: 'kdw', roles: ['superuser'] }}
        ]
    },
    {
        path: '/blog',
        component: Layout,
        redirect: '/blog/article/',
        name: 'blog',
        meta: {
            title: 'Blog',
            icon: 'tq-ego-blog'
        },
        children: [
            { path: 'create', component: () => import('@/views/blog/create'), name: 'createArticle', meta: { title: 'createArticle', icon: 'tq-add' }},
            // { path: 'article/edit/:id(\\d+)', component: () => import('@/views/blog/edit'), name: 'editArticle', meta: { title: 'editArticle', noCache: true }, hidden: true },
            { path: 'list', component: () => import('@/views/blog/list'), name: 'articleList', meta: { title: 'articleList', icon: 'tq-list' }}
        ]
    },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,





  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },



  { path: '*', redirect: '/404', hidden: true }
];
