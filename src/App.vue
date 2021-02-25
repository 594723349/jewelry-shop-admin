<!--
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:38:42
 * @LastEditTime: 2021-02-25 14:13:15
 * @LastEditors: cxf
 * @Description: 
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/App.vue
-->
<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
// eslint-disable-next-line camelcase
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  data() {
    return {
      zh_CN
    };
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  width: 100%;

  background: #eff1f4;
}
#app {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1240px;
}

ul {
  list-style: none;
}
.pull-right {
  float: right;
}
/* 过滤条件panel */
.filter-line {
  padding: 16px;
  margin: 0 !important;
  border-bottom: 10px solid #eff1f4;
  .ant-calendar-range-picker-input {
    line-height: 20px;
  }
  &.align-right {
    text-align: right;
  }
  .ant-select-selection--single {
    height: 30px !important;
    line-height: 30px !important;
  }
  .ant-select-selection__rendered {
    line-height: 30px !important;
  }
}
// 顶部操作栏
.top-action-row {
  .col-right {
    text-align: right;
    & > * {
      margin-left: 16px;
    }
  }
  .col-left {
    text-align: left;
    & > * {
      margin-right: 16px;
    }
  }
  .ant-select {
    width: 150px;
  }
  .search-input,
  .ant-input-group-wrapper {
    width: 264px;
  }
  .ant-input-group.ant-input-group-compact {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    margin-top: -2px;
  }
}
.ant-input-group-compact {
  .ant-input {
    border-color: #d9d9d9;
  }
}
/* tab标签页 */
.flex-tabs {
  display: flex;
  flex-direction: column;
  flex: 1;
  .ant-tabs-bar {
    margin: 0 20px;
  }
  .ant-tabs-content {
    flex: 1;
    overflow-y: hidden;
  }
  .ant-tabs-tabpane.ant-tabs-tabpane-active {
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }
}
/* 表格排序列 */
.sort-handler {
  font-size: 0px;
  .ant-btn-link {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
  }
}
.tm-modal {
  .ant-modal-header {
    border-bottom-style: dashed;
  }
}
</style>
