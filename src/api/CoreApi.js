
export default  {
  ADMIN_LOGIN:'/api/admin/login/',
  QINIU_TOKEN:'/api/admin/qiniu_token/',
  WEIBO_API:'/api/weiboapi/',
  ACCOUNT_ROLE_PK: '/api/admin/role/{pk}/', // 获取角色列表
  ACCOUNT_ROLE_LIST: '/api/admin/role/',
  ACCOUNT_ROLE_TREE: '/api/admin/role/tree/',
    ACCOUNT_ROLE_ALL_LIST: '/api/admin/role/all/',
  ACCOUNT_ROLE_SETMENU:"api/admin/role/{pk}/setmenu/", // 设置角色菜单
  ACCOUNT_USER_LIST: '/api/admin/user/', // 获取角色列表
  ACCOUNT_USER_PK: '/api/admin/user/{pk}/', // 获取角色列表
  ACCOUNT_MENU_TREE: '/api/admin/menu/tree/', // 获取菜单树
  ACCOUNT_MENU_TREE_LIST: '/api/admin/menu/tree_list/', // 获取菜单树
  ACCOUNT_MENU_PK: '/api/admin/menu/{pk}/', // 菜单
  ACCOUNT_MENU_LIST: '/api/admin/menu/', // 菜单
  ACCOUNT_MENU_SET_ROLE:'/api/admin/menu/{pk}/setrole/', // 菜单设置权限
  ACCOUNT_ROLE_HAS_ROLE:"/api/admin/role/has_role/", //某个实体拥有的角色

  SHOP_COURSE_LIST: '/api/admin/shop/course/',
  SHOP_CATEGORY_LIST: '/api/admin/shop/category/',
  SHOP_CATEGORY_PK: '/api/admin/shop/category/{pk}/',
  SHOP_QIAOHUORSER_LIST: '/api/admin/shop/qiaohuorder/',
  SHOP_QIAOHUTASK_PK: '/api/admin/shop/qiaohuorder/{pk}/',
  SHOP_QIAOHUTASK_LIST: '/api/admin/shop/qiaohurecord/',
  SHOP_KDW_LIST:"/api/admin/shop/kdw/",
  SHOP_KDW_FILE:"/api/admin/shop/kdw/{pk}/get_location_url/",
    PANDOWNLOAD_SEARCH:"/api/admin/pandownload/search/"



}

