/*
 * @Description: 注册用户管理
 * @Author: cxf
 * @Date: 2020-11-12 18:59:13
 * @LastEditTime: 2021-02-20 16:46:08
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/modules/registerUser.js
 */
const registerUser = () => import("@/views/registerUser/list.vue");
export default [
  {
    path: "registerUser/list",
    name: "registerUserList",
    component: registerUser,
  },
];
