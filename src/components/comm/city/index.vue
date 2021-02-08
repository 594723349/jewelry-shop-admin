<!--
 * @Description: 
 * @Author: cxf
 * @Date: 2021-01-21 16:34:16
 * @LastEditTime: 2021-01-22 16:46:41
 * @LastEditors: cxf
 * @FilePath: /score-ms/src/components/comm/city/index.vue
-->
<template>
  <div class="c-city">
    <a-cascader
      v-model="cityValue"
      :options="options"
      :field-names="{ label: 'cname', value: 'id', children: 'children' }"
      :load-data="loadData"
      placeholder="请选择城市"
      change-on-select
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: "CCity",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [],
      cityValue: [],
      defaultValue: [],
      cityMap: {},
    };
  },
  methods: {
    getData(parentId) {
      let cityMap = {};
      return new Promise((resolve) => {
        this.$api.getCity({ parentId }).then((data) => {
          data.forEach((item) => {
            item.isLeaf = !item.subCityCount;
            cityMap[item.id] = item.cname;
          });
          this.cityMap = Object.assign({}, this.cityMap, cityMap);
          resolve(data);
        });
      });
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      this.getData(targetOption.id).then((data) => {
        this.$set(targetOption, "children", data);
        targetOption.loading = false;
      });
    },
    /**
     * @description: 获取城市名称
     */
    getLabel() {
      let label = [];
      this.value.forEach((v) => {
        label.push(this.cityMap[v]);
      });
      label = label.join("/");
      return label;
    },
    onChange(value) {
      this.$emit("change", value);
    },
    /**
     * @description: 回显时需要手动去加载子级数据，这控件真难用。。。。
     */
    getOptions(id, index, options) {
      if (id === 0) {
        this.getData(id).then((data) => {
          this.options = data;
          const id = this.cityValue[0];
          id && this.getOptions(id, 0, data);
        });
      } else {
        this.getData(id).then((data) => {
          for (let i = 0; i < options.length; i++) {
            const city = options[i];
            if (city.id === id && !city.isLeaf) {
              this.$set(city, "children", data);
              let nextId = this.cityValue[index + 1];
              nextId && this.getOptions(nextId, index + 1, city.children);
              break;
            }
          }
        });
      }
    },
  },
  watch: {
    value(now) {
      this.cityValue = now;
      this.defaultValue = now;
      if (now.length) {
        this.getOptions(0, 0);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.c-city {
  display: inline-block;
}
</style>
