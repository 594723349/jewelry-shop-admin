<!--
 * @Description: 操作栏
 * @Author: cxf
 * @Date: 2020-09-01 11:33:25
 * @LastEditTime: 2021-01-27 15:04:56
 * @LastEditors: cxf
 * @FilePath: /score-ms/src/components/comm/icons/index.vue
-->

<template>
  <div class="c-toolbar-icon" :class="['align-' + align]">
    <a-icon
      v-for="(icon, index) in btns"
      :key="index"
      :type="icon.type"
      @click.stop="handleClick(icon)"
    />
  </div>
</template>

<script>
export default {
  name: "CIcons",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: ""
    },
    data: {
      type: Object
    },
    align: {
      type: String,
      default: "left"
    }
  },
  computed: {
    btns() {
      const validFields = this.columns.filter(this.isValidItem);
      return validFields;
    }
  },
  methods: {
    handleClick(item) {
      typeof item.on === "function" && item.on(this.data, item);
    },
    /**
     * @description: 校验合法性
     */
    isValidItem(item) {
      if (typeof item.perms === "function") {
        return item.perms();
      } else if (item.perms) {
        const perms = [].concat(item.perms);
        return perms.some(perm => this.hasPermission(perm));
      } else {
        return true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.anticon {
  color: #4786ff;
  font-size: 20px;
}
.align {
  &-left {
    text-align: left;
    .anticon + .anticon {
      margin-right: 10px;
    }
  }
  &-right {
    text-align: right;
    .anticon + .anticon {
      margin-left: 10px;
    }
  }
}
</style>
