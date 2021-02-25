/*
 * @Description: 公告管理路由
 * @Author: cxf
 * @Date: 2020-11-12 18:59:13
 * @LastEditTime: 2021-02-24 10:56:13
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/router/modules/order.js
 */
const order = () => import("@/views/order/list.vue");
const orderEdit = () => import("@/views/point/goods/edit.vue");
export default [
  {
    path: "order/list",
    name: "orderList",
    component: order,
  },
  {
    path: "point/goods/edit/:id",
    name: "editPointGoods",
    component: orderEdit,
  },
];
