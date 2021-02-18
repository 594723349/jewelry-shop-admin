<!--
 * @Description: 编辑基本布局
 * @Author: cxf
 * @Date: 2020-11-13 14:36:25
 * @LastEditTime: 2021-02-18 09:36:50
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/components/layout/editLayout.vue
-->
<template>
  <div class="edit-layout">
    <a-spin size="large" :spinning="isLoading">
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer">
          <c-toolbar :columns="toolbar" theme="pageEdit" button-type="default"></c-toolbar>
        </slot>
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  props: {
    footer: {
      type: Boolean,
      default: true
    },
    toolbar: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    loading(flag = false) {
      this.isLoading = flag;
    }
  }
};
</script>

<style lang="less" scoped>
.edit-layout {
  height: 100%;
}
.body {
  padding: 16px;
  height: calc(100% - 46px);
  overflow-y: auto;
}
/deep/ .ant-spin-nested-loading,
/deep/ .ant-spin-container {
  height: 100%;
}
</style>
