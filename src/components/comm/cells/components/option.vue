<!--
 * @Description: 文本展示-下拉列表值转换
 * @Author: cxf
 * @Date: 2020-12-10 11:54:12
 * @LastEditTime: 2020-12-28 23:54:01
 * @LastEditors: cxf
 * @FilePath: /media-source-bms/src/components/comm/cells/components/option.vue
-->
<template>
  <div class="c-cell-comp cell-options">
    <template>{{ getOptionsLabel() }}</template>
  </div>
</template>

<script>
import { options } from '@/utils/config';
export default {
  name: 'c-cell-options',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Number, Array, String],
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options,
    };
  },
  methods: {
    /**
     * @description: 通过value获取下拉列表指定label值
     * @param {*} options
     * @param {*} value
     * @return {*}
     */
    getOptionsLabel() {
      if (this.value === '') return '';
      let options = this.options[this.type];
      for (let index = 0; index < options.length; index++) {
        const item = options[index];
        if (item.value === this.value) {
          return item.label;
        }
      }
      return '';
    },
  },
};
</script>

<style lang="less" scoped>
.cell-options {
  display: inline-block;
}
</style>
