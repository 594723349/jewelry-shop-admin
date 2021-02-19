/*
 * @Description: 公告管理路由
 * @Author: cxf
 * @Date: 2020-11-12 18:59:13
 * @LastEditTime: 2021-02-19 16:33:15
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/modules/point.js
 */
const goods = () => import("@/views/point/goods/list.vue");
const goodsEdit = () => import("@/views/point/goods/edit.vue");
export default [
  {
    path: "point/goods/list",
    name: "pointGoods",
    component: goods,
  },
  {
    path: "point/goods/edit/:id",
    name: "editPointGoods",
    component: goodsEdit,
  },
];
