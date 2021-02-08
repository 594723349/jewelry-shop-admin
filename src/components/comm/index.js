/*
 * @Description: 全局注册的公共组件
 * @Author: cxf
 * @Date: 2020-09-01 11:33:59
 * @LastEditTime: 2021-02-06 20:32:23
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\comm\index.js
 */

import tableBtnGroup from './Table/actions.vue'; // 表格按钮组
import form from './form/base-form.vue'; // form表单
import toolbar from './toolbar/toolbar.vue'; // 通用顶部工具栏
import icons from './icons/index.vue'; // 通用icon工具栏
import card from './card/card.vue'; // 卡片
import cells from './cells/index.vue';
import option from './cells/components/option.vue';
import imageGroup from './image/imageGroup.vue'; // 卡片-图片
import preview from './modal/preview.vue'; // 预览
export default {
  install(Vue) {
    Vue.component('table-btns', tableBtnGroup);
    Vue.component('c-form', form);
    Vue.component('c-toolbar', toolbar);
    Vue.component('c-icons', icons);
    Vue.component('c-card', card);
    Vue.component('c-cells', cells);
    Vue.component('c-cell-option', option);
    Vue.component('c-img-group', imageGroup);
    Vue.component('c-preview', preview);
  }
};
