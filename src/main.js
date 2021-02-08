/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:38:42
 * @LastEditTime: 2021-02-06 22:30:49
 * @LastEditors: chenxiaofan
 * @Description:
 * @FilePath: \jewelry-shop\admin\src\main.js
 */
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import api from './utils/api';
import fetch from './utils/fetch';
import moment from 'moment';
import 'moment/locale/zh-cn';

import commComponents from '@/components/comm';
import preview from '@/components/comm/modal/preview.vue'; // 预览
import emitter from './utils/emitter';
import './utils/filter';
import './assets/icons/iconfont.css';
import 'ant-design-vue/dist/antd.less';
import './assets/less/public.less';
import './antd-vue.js';
import Utils from '@/utils/utils';

moment.locale('zh-cn');

Vue.use(commComponents);

Vue.prototype.$api = api;
Vue.prototype.$fetch = fetch;
Vue.config.productionTip = false;
Vue.prototype.dispatch = emitter.methods.dispatch;
Vue.prototype.broadcast = emitter.methods.broadcast;
Vue.prototype.$priview = preview;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
