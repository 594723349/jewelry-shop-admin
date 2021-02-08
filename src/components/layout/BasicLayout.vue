<template>
  <a-layout class="layout-container">
    <main-header></main-header>
    <a-layout class="layout-sub-container">
      <a-layout-sider class="layout-sidebar" width="168px">
        <SideMenu />
      </a-layout-sider>
      <a-layout id="main_layout">
        <a-layout-content class="layout-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
/* eslint-disable max-len */
import MainHeader from './Header.vue';
import SideMenu from './SideMenu.vue';

export default {
  data() {
    return {
      breadcrumb: []
    };
  },
  components: {
    SideMenu,
    MainHeader
  },
  mounted() {
    this.breadcrumb = this.$route.meta.breadcrumb || [];
  },
  updated() {
    this.breadcrumb = this.$route.meta.breadcrumb || [];
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  min-width: 1366px;
  height: 100%;

  .layout-sub-container {
    overflow-y: hidden;
  }

  .layout-sidebar {
    background: #2b2b2b;
    z-index: 20;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px !important;
    }
    scrollbar-width: none;
  }

  .layout-content {
    margin: 9px;
    overflow-y: hidden;
    overflow-x: hidden;
    flex: 1;
    background: #fff;
  }

  .layout-infobar {
    margin-top: 12px;
  }

  .layout-content > div {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .layout-content > div[overflow] {
    height: 100%;
    overflow-y: auto;
    display: block;
  }

  .layout-content > div[transparent] {
    background: #eff1f4;
  }

  .layout-breadcrumb {
    margin: 16px 16px 0;
    line-height: 22px;
    font-size: 16px;
    color: #3e3e3e;

    ::v-deep a {
      color: #333;
    }
  }

  .spin {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
