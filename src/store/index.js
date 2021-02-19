/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:38:42
 * @LastEditTime: 2021-02-19 16:00:10
 * @LastEditors: cxf
 * @Description:
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/store/index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "jewelry_admin",
  reducer: (state) => {
    const { userInfo, token } = state;
    return { userInfo, token };
  },
});
export default new Vuex.Store({
  state: {
    userInfo: {},
    token: "",
    loading: false,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    clearUserInfo({ commit }) {
      commit("setUserInfo", {});
      commit("setToken", "");
    },
  },
  plugins: [vuexLocal.plugin],
});
