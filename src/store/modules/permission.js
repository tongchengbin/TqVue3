import { asyncRouterMap, constantRouterMap } from '@/router'
import store from "../index";
import router from "../../router";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param menu
 * @param route
 */
function hasPermission(menu, route) {
  for(let i=0;i<menu.length;i++){
    if(menu[i].key===route.name){
      return true
    }
  }
  return false
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param menu
 */
function filterAsyncRouter(routes, menu) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(menu, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, menu);
        if(tmp.children.length>0){
          res.push(tmp)
        }
      }else{
          res.push(tmp)
      }

    }
  });
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, menu) {
      return new Promise(resolve => {
        let accessedRouters;
        accessedRouters = filterAsyncRouter(asyncRouterMap, menu);
        accessedRouters.push({ path: '*', redirect: '/404', hidden: true });
        commit('SET_ROUTERS', accessedRouters);
        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
        resolve()
      })
    }
  }
};

export default permission
