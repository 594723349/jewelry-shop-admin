<!--
 * @Description: 操作栏
 * @Author: cxf
 * @Date: 2020-09-01 11:33:25
 * @LastEditTime: 2021-01-26 09:20:53
 * @LastEditors: cxf
 * @FilePath: /score-ms/src/components/comm/toolbar/toolbar.vue
-->

<template>
  <div class="c-toolbar" :class="themeClass">
    <div class="left">
      <template v-for="(item, i) in btns.left">
        <toolbarItem
          :key="i"
          :item="item"
          :props="props"
          @change="handleChange"
          :buttonType="buttonType"
        />
      </template>
    </div>
    <div class="right">
      <template v-for="(item, i) in btns.right">
        <toolbarItem
          :key="i"
          :item="item"
          :props="props"
          @change="handleChange"
          :buttonType="buttonType"
        />
      </template>
    </div>
  </div>
</template>

<script>
import toolbarItem from "./toolbarItem.vue";
export default {
  name: "CToolBar",
  components: {
    toolbarItem
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: "default" // pageEdit、default
    },
    props: {
      type: Object
    },
    buttonType: {
      type: String,
      default: "orange"
    }
  },
  computed: {
    btns() {
      const validFields = this.columns.filter(this.isValidItem);
      let left = [];
      let right = [];
      validFields.forEach((item, index) => {
        if (item.align === undefined || item.align === "left") {
          left.push({
            ...item,
            index
          });
        } else {
          right.push({
            ...item,
            index
          });
        }
      });
      return {
        left,
        right
      };
    },
    themeClass() {
      let clas = [];
      let prefix = "toolbar-theme--";
      this.theme.split(",").forEach(item => [clas.push(prefix + item)]);
      return clas;
    },
    propArr() {
      return this.columns.map(item => item.prop || item.key);
    }
  },
  methods: {
    handleChange(data) {
      this.$emit("change", data);
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
    },
    /**
     * @description: 设置是否禁用
     * @param {*} props
     * @param {*} status
     * @return {*}
     */
    disabled(props, status) {
      props = [].concat(props);
      props.forEach(prop => {
        const index = this.propArr.indexOf(prop);
        if (index !== -1) {
          if (this.columns[index].disabled !== status) {
            this.$set(this.columns[index], "disabled", status);
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.c-toolbar {
  display: flex;
  justify-content: space-between;
  & + .c-toolbar {
    padding-top: 0;
  }
}
.toolbar-theme--simpli {
  padding: 16px;
  background-color: #fff;
}
.toolbar-theme--default {
  padding: 16px;
  background-color: #fff;
  border-bottom: 8px solid #f0f2f5;
}
.toolbar-theme--pageEdit {
  background-color: #34404e;
  height: 46px;
  text-align: center;
  justify-content: center;
  align-items: center;
  .left,
  .right {
    flex: none;
  }
  /deep/ .c-toolbar-item {
    .ant-btn {
      min-width: 76px;
    }
  }
}
.left {
  /deep/ .toolbar-node {
    margin-right: 16px;
  }
}
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  /deep/ .toolbar-node {
    padding-left: 16px;
  }
}
</style>
