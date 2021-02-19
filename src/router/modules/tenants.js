/*
 * @Description: 租户管理路由
 * @Author: cxf
 * @Date: 2020-11-12 18:59:13
 * @LastEditTime: 2021-02-19 10:10:55
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/modules/tenants.js
 */
const tenants = () => import("@/views/tenants/list.vue");
export default [
  {
    path: "tenant/list",
    name: "tenantList",
    component: tenants,
  },
];
