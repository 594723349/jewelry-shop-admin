<!--
 * @Description: 操作栏
 * @Author: cxf
 * @Date: 2020-09-01 11:33:25
 * @LastEditTime: 2021-01-25 18:51:29
 * @LastEditors: cxf
 * @FilePath: /score-ms/src/components/comm/toolbar/toolbarItem.vue
-->

<template>
  <div class="c-toolbar-item">
    <!-- 按钮 -->
    <a-button
      v-if="item.fieldType === undefined || item.fieldType === 'btn'"
      :class="[
        'toolbar-node',
        'toolbar-node__' + (item.fieldType || 'btn'),
        item.disabled && 'btn-disabled',
      ]"
      :type="item.type || buttonType"
      :icon="item.icon"
      :loading="loading"
      :disabled="item.disabled"
      @click.stop="handleClick(item)"
      >{{ item.label }}</a-button
    >
    <!-- 下拉 -->
    <a-select
      v-if="item.fieldType === 'select'"
      v-model="props[item.prop]"
      :placeholder="item.placeholder"
      :style="{ width: item.width || '150px' }"
      :dropdownMatchSelectWidth="false"
      :class="['toolbar-node', 'toolbar-node__' + item.fieldType]"
      :dropdownClassName="'toolbar-node__select-options'"
      @change="handleChange"
    >
      <a-select-option
        v-for="(selectOption, optionIndex) in item.selectType
          ? options[item.selectType]
          : item.data"
        :key="optionIndex"
        :disabled="selectOption.disabled"
        :value="selectOption.value"
        >{{ selectOption.label }}</a-select-option
      >
    </a-select>
    <!-- 日期 -->
    <a-range-picker
      v-model="date"
      v-if="item.fieldType === 'date'"
      :class="['toolbar-node', 'toolbar-node__' + item.fieldType]"
      @change="rangePickerChange"
      :style="{ width: item.width || '240px' }"
    />
    <!-- 搜索 -->
    <a-input-search
      v-if="item.fieldType === 'search'"
      class="search-input"
      :class="['toolbar-node', 'toolbar-node__' + item.fieldType]"
      :placeholder="item.placeholder || '请输入搜索内容'"
      allowClear
      @search="handleSearch"
    >
      <a-button class="search-button" type="primary" slot="enterButton" :loading="loading">{{
        item.label || "搜索"
      }}</a-button>
    </a-input-search>
  </div>
</template>

<script>
import { options } from "@/utils/config.js";
export default {
  name: "CToolbarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: () => {
        return {};
      },
    },
    buttonType: {
      type: String,
      default: "orange",
    },
  },
  data() {
    return {
      loading: false,
      date: [],
      options,
    };
  },
  created() {
    this.init();
  },
  methods: {
    /**
     * @description: 初始化
     */
    init() {
      const { defaultValue, fieldType } = this.item;
      if (fieldType === "date" && defaultValue) {
        this.date = typeof defaultValue === "function" ? defaultValue() : defaultValue;
        this.rangePickerChange(this.date);
      }
    },
    /**
     * @description: 按钮点击⌚️
     */
    handleClick(btn) {
      if (this.loading) return;
      if (btn.disabled) return;
      btn.on(this.setLoading, btn);
    },
    /**
     * @description: 搜索
     */
    handleSearch(value) {
      this.props[this.item.prop] = value;
      if (typeof this.item.on === "function") {
        this.item.on(this.setLoading);
      }
    },
    /**
     * @description: 值变化，通知外部
     * @param {*} value
     */
    handleChange(value) {
      const { index, prop } = this.item;
      this.$emit("change", {
        value,
        index,
        key: prop,
      });
    },
    /**
     * @description: 日期切换
     * @param {*} value
     */
    rangePickerChange(value) {
      let dates = [];
      if (!value.length) {
        this.item.prop.forEach((key) => {
          this.$set(this.props, key, "");
        });
      } else {
        const { format = "YYYY-MM-DD", formatValue } = this.item;
        value.forEach((date, index) => {
          if (date) {
            if (format === "YYYY-MM-DD") {
              dates[index] = this.addTime(date, index);
            }
            if (formatValue === "valueOf") {
              dates[index] = dates[index].valueOf();
            } else {
              dates[index] = dates[index].format(formatValue || format);
            }
            this.$set(this.props, this.item.prop[index], dates[index]);
          }
        });
      }
      this.handleChange(dates);
    },
    /**
     * @description: 日期添加时分妙
     */
    addTime(date, index) {
      if (index === 0) {
        date.set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        });
      } else {
        date.set({
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 59,
        });
      }
      return date;
    },
    /**
     * @description: 更新loading
     * @param {Boolean} flag
     */
    setLoading(flag = false) {
      this.loading = flag;
    },
  },
};
</script>
<style lang="less" scoped>
.c-toolbar-item {
  display: inline-block;
}
.ant-btn-orange {
  color: #4786ff;
  background-color: transparent;
  border-color: #4786ff;
  text-shadow: none;
}
.btn-disabled.ant-btn[disabled] {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  text-shadow: none;
  box-shadow: none;
}
.ant-select {
  width: 150px;
}
</style>
