/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:38:42
 * @LastEditTime: 2021-02-06 20:17:25
 * @LastEditors: chenxiaofan
 * @Description:
 * @FilePath: \jewelry-shop\admin\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'jewelry_admin',
  reducer: state => {
    const { userInfo } = state;
    return { userInfo };
  }
});
export default new Vuex.Store({
  state: {
    userInfo: {},
    loading: false
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload.userInfo;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  plugins: [vuexLocal.plugin]
});
