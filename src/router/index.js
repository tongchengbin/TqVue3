import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('../views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('../views/login/authredirect'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

    {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'tq-dashboard1', noCache: true }
      }
    ]
  }
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/account',
        component: Layout,
        name: 'system',
        keyword:"system",
        meta: {
            title: '系统管理',
            icon: 'tq-yonghuguanli',
            roles: ['superuser', 'admin']
        },
        children: [
            { path: 'user',name: 'user',keyword:"user",  component: () => import('@/views/account/user'), noCache: true, meta: { title: '用户', icon: 'tq-yonghuguanli' }},
            { path: 'role',name: 'role',keyword:"role",  component: () => import('../views/account/role'), meta: { title: '角色', icon: 'tq-jiaoseshezhi' }},
            { path: 'permission',name: 'permission',keyword:"permission", component: () => import('@/views/account/permission'),  meta: { title: '权限', icon: 'tq-quanxian1' }}
        ]
    },

    {
        path: '/shop',
        component: Layout,
        name: 'shop',
        keyword:"shop",
        meta: { title: 'Goods', icon: 'tq-shop' },
        children: [
            { path: 'course', name: 'course',keyword: 'course', component: () => import('@/views/shop/course'), meta: { title: '课程', icon: 'tq-kecheng' }},
            { path: 'category', name: 'category',keyword: 'category', component: () => import('@/views/shop/category'), meta: { title: '分类', icon: 'tq-category' }},
            // { path: 'funserver', name: 'FunServer', component: () => import('@/views/shop/funlist'), meta: { title: 'funserver', icon: 'form' }},
            // { path: 'imoocedit/:id(\\d+)', name: 'imoocedit', hidden: true, component: () => import('@/views/shop/imoocedit'), meta: { title: 'Edit', icon: 'tree' }},
            { path: 'qiaohuorder', name: 'qiaohuorder', keyword:"qiaohuorder",component: () => import('@/views/shop/qiaohuOrder'), meta: { title: '巧虎订单', icon: 'tq-ertong' }},
            { path: 'qiaohurecord', name: 'qiaohuorderTask',keyword:"qiaohuorder", component: () => import('@/views/shop/qiaohuRecord'), meta: { title: '巧虎任务执行', icon: 'tq-ertong' },hidden:true},
            // { path: 'taobaocourse', name: 'taobaocourse', component: () => import('@/views/shop/taobaoCourse'), meta: { title: 'taobaocourse', icon: 'form' }},
            { path: 'weiboapi', name: 'WeiboApi', component: () => import('@/views/shop/weiboapi'), meta: { title: 'WeiboApi', icon: 'tq-weibo' }},
            { path: 'kdw', name: 'kdw', component: () => import('@/views/shop/sexx'), meta: { title: '蝌蚪', icon: 'tq-weibiaoti1' }},
            { path: 'pandownload', name: 'pandownload',keyword: 'pandownload', component: () => import('../views/resource/PanDownloadSearch'), meta: { title: '百度资源搜索', icon: 'tq-kecheng' }}
        ]
    },
    {
        path: '/blog',
        component: Layout,
        redirect: '/blog/article/',
        name: 'blog',
        keyword: 'blog',
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



];
