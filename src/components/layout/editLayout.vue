<!--
 * @Description: 编辑基本布局
 * @Author: cxf
 * @Date: 2020-11-13 14:36:25
 * @LastEditTime: 2020-11-13 20:45:33
 * @LastEditors: cxf
 * @FilePath: /media-source-bms/src/components/layout/editLayout.vue
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
      default: true,
    },
    toolbar: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    loading(flag = false) {
      this.isLoading = flag;
    },
  },
};
</script>

<style lang="less" scoped>
.edit-layout {
  height: 100%;
  overflow-y: auto;
}
.body {
  padding: 16px;
}
</style>
