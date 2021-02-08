/*
 * @Description: 公告管理路由
 * @Author: cxf
 * @Date: 2020-11-12 18:59:13
 * @LastEditTime: 2021-02-06 21:33:19
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\router\modules\point.js
 */
const goods = () => import('@/views/point/goods.vue');
export default [
  {
    path: 'point/goods',
    name: 'pointGoods',
    meta: {
      breadcrumb: ['积分管理', '积分商品']
    },
    component: goods
  }
];
