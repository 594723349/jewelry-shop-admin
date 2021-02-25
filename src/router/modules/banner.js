/*
 * @Description: 公告管理路由
 * @Author: cxf
 * @Date: 2020-11-12 18:59:13
 * @LastEditTime: 2021-02-25 14:49:12
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/modules/banner.js
 */
const operationsBanner = () => import("@/views/operations/banner/list.vue");
export default [
  {
    path: "operations/banner/list",
    name: "operationsBannerList",
    component: operationsBanner,
  },
];
