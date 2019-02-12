import  { getInfoData,logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/api/public'
import CoreApi from '@/api/CoreApi'
const user = {
  state: {
    info:{},
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menu:[],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_INFO: (state, data) => {
      state.info = data
    },
    SET_MENU:(state,menu) =>{
      state.menu = menu
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data;
          commit('SET_TOKEN', data.token);
          setToken(response.data.token);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      const data={};
      return new Promise((resolve, reject) => {
          getInfoData(data).then(response => {
          const data = response.data;
          commit('SET_INFO',data);
          commit('SET_MENU',data.menu);
          commit('SET_ROLES',data.roles_vo);
          commit('SET_NAME', data.username);
          commit('SET_AVATAR', data.avatar);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FedLogOut({ commit, state }){
        return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                removeToken();
                resolve()
        })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role);
        getUserInfo(role).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          dispatch('GenerateRoutes', data.menu); // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
};

export default user
