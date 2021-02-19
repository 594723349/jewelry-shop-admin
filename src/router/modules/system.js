/*
 * @Description: 系统管理
 * @Author: cxf
 * @Date: 2021-02-19 10:57:44
 * @LastEditTime: 2021-02-19 11:19:34
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/modules/system.js
 */
const systemUsers = () => import("@/views/system/user/list.vue");
export default [
  {
    path: "system/user/list",
    name: "systemUserList",
    component: systemUsers,
  },
];
