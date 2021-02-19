/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:38:42
 * @LastEditTime: 2021-02-19 11:19:10
 * @LastEditors: cxf
 * @Description:
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import point from "./modules/point";
import tenants from "./modules/tenants";
import system from "./modules/system";
import BasicLayout from "@/components/layout/BasicLayout.vue";
Vue.use(VueRouter);
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/view",
    component: BasicLayout,
    children: [...point, ...tenants, ...system],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.NODE_ENV === "production" ? "/admin/" : process.env.BASE_URL,
  routes,
});
export default router;
