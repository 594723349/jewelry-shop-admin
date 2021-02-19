<!--
 * @Author: jiang chuyun
 * @Date: 2020-09-07 14:55:24
 * @LastEditTime: 2021-02-19 15:01:04
 * @LastEditors: cxf
 * @Description: 总Header
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/components/layout/Header.vue
-->
<template>
  <a-layout-header class="layout-header">
    <div class="logo-title">
      <!-- <img :src="config.logo" v-if="config.logo" /> -->
      <span>后台管理系统</span>
    </div>
    <div class="name-bar">
      <span>{{ username }}</span>
      <a-divider type="vertical" />
      <a-button @click="logOut()" type="link">退出</a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      username: this.$store.state.userInfo.username,
      avatar: "",
      loading: false
    };
  },
  methods: {
    /**
     * @description: 退出登录
     */
    logOut() {
      this.$api.logout().then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.layout-header {
  background-color: #2b2b2b;
  border-bottom: 1px solid #3b3b3b;
  padding: 0;
  .logo-title {
    display: inline-block;
    margin-left: 18px;
    color: #fff;
    font-size: 20px;
    line-height: 26px;
    padding-left: 10px;
    font-weight: bold;
    img {
      width: 40px;
      margin-right: 5px;
    }
  }

  .name-bar {
    float: right;
    margin-right: 16px;
    font-size: 14px;
    color: #fff;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      margin-right: 10px;
    }
    .ant-btn-link {
      font-size: 14px;
      color: #fff;
    }
    .ant-divider,
    .ant-divider-vertical {
      margin: 0 16px;
    }
  }

  .notice {
    position: relative;
    margin: 3px 8px;
    padding: 4px 8px;
    font-size: 14px !important;
    color: rgba(0, 0, 0, 0.75) !important;
    border-radius: 4px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;

    .row {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 16px !important;
      line-height: 16px !important;
    }
  }
}
</style>
