<!--
 * @Description: 表格按钮组
 * @Author: cxf
 * @Date: 2020-09-01 11:33:25
 * @LastEditTime: 2021-02-07 01:56:51
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\comm\Table\actions.vue
-->

<template>
  <div class="table-btn-group" :class="['type-' + type, layout]">
    <template v-for="(btn, i) in btns">
      <!-- 按钮 -->
      <a-button
        v-if="btn.type === undefined || btn.type === 'btn'"
        :key="i"
        :class="[btn.type, 'operation-btn', 'custom-btn-' + index]"
        :icon="btn.icon"
        :loading="btn.loading"
        :disabled="btn.disabled"
        @click.stop="handleClick(btn, record, index, i)"
        >{{ btn.text || btn.label }}</a-button
      >
      <!-- 下拉 -->
      <a-dropdown v-if="btn.type === 'dropdown'" :key="i" :class="['operation-btn']">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <template v-if="btn.items.length"> {{ btn.text }} <a-icon type="down" /> </template>
          <template v-else>--</template>
        </a>
        <a-menu v-if="btn.items.length" slot="overlay">
          <a-menu-item v-for="(item, itemIndex) in btn.items" :key="itemIndex">
            <div @click.stop="handleClick(item, record, index, itemIndex)">
              {{ item.label }}
            </div>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TableBtnGroup',
  props: {
    data: {
      type: [Array, Function],
      default: () => []
    },
    type: {
      type: String,
      default: 'text'
    },
    record: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    layout: {
      type: String,
      default: 'inline'
    }
  },
  computed: {
    btns() {
      const btns = typeof this.data === 'function' ? this.data(this.record, this.index) : this.data;
      const validFields = btns.filter(this.isValidItem);
      return validFields.filter(field => {
        if (field.type === 'dropdown') {
          field.items = field.items.filter(this.isValidItem);
          return true;
        } else {
          return this.isValidItem(field);
        }
      });
    }
  },
  methods: {
    handleClick(btn, record, index, optionIndex) {
      if (btn.disabled) return;
      const event = btn.clickEvent || btn.on;
      event(record, index, optionIndex);
    },
    /**
     * @description: 校验合法性
     */
    isValidItem(item) {
      if (typeof item.perms === 'function') {
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
/deep/ .ant-select {
  // min-width: 100px;
  .ant-select-selection {
    border: none;
    height: auto;
    line-height: normal;
    background-color: transparent;
    .flex();
  }
  .ant-select-selection__rendered {
    line-height: normal;
    margin: 0;
  }
  .ant-select-selection__placeholder {
    display: inline-block !important;
    position: static;
    line-height: normal;
    margin-top: 0;
    vertical-align: middle;
    color: #4786ff;
  }
  .ant-select-arrow {
    position: static;
    vertical-align: middle;
    margin-top: 4px;
    margin-left: 2px;
  }
  .ant-select-arrow-icon {
    svg {
      fill: #4786ff;
    }
  }
  .ant-select-selection {
    box-shadow: none;
  }
  .ant-select-selection-selected-value {
    display: none !important;
  }
}
.table-btn-group {
  /deep/ .ant-btn {
    box-shadow: none;
  }
}
.table-btn-group.type-text {
  /deep/ .ant-btn {
    padding: 0;
    width: auto;
    height: auto;
    display: inline-block;
    background-color: transparent;
    border: none;
    color: #4786ff;
  }
}
.table-btn-group.block {
  /deep/ .ant-btn {
    display: block;
  }
}
.operation-btn {
  margin-right: 10px;
}
.operation-btn:last-child {
  margin-right: 0;
}
</style>
<style lang="less">
.table-btn-group-select-options {
  min-width: 88px;
  .ant-select-dropdown-menu-item-selected,
  .ant-select-dropdown-menu-item-selected:hover,
  .ant-select-dropdown-menu-item-active {
    font-weight: normal;
    background: transparent;
    &:hover {
      background-color: transparent;
    }
  }
}
</style>
