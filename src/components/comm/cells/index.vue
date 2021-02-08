<!--
 * @Description: 列渲染
 * @Author: chenxiaofan
 * @Date: 2020-12-10 23:30:01
 * @LastEditors: cxf
 * @LastEditTime: 2021-02-01 17:39:49
 * @FilePath: /score-ms/src/components/comm/cells/index.vue
-->
<template>
  <div
    class="c-cell"
    :class="getClass()"
    ref="CCell"
    :style="{ height: height, maxHeight: maxHeight }"
  >
    <template v-for="(item, index) in columns">
      <div
        v-if="isShow(item)"
        class="c-cell-item"
        :class="['c-cell-item__' + item.key]"
        :key="index"
        :style="{ width: item.width }"
      >
        <div
          class="c-cell-item__label"
          :style="{
            width: autoLabelWidth || item.labelWidth || labelWidth,
            minWidth: item.labelMinWidth || labelMinWidth,
            textAlign: labelPosition,
          }"
        >
          {{ getLabel(item, index) }}
        </div>
        <div class="c-cell-item__content" :style="item.contentWidth || contentWidth">
          <template v-if="item.customRenderSlot">
            <slot
              :name="item.customRenderSlot"
              :value="getValue(item)"
              :column="item"
              :index="index"
            ></slot>
          </template>
          <template v-else-if="item.component">
            <!-- 图片展示 -->
            <c-img-group
              v-if="item.component.name === 'image'"
              :data="getValue(item)"
              :width="getProps(item).width"
              :height="getProps(item).height"
            ></c-img-group>
          </template>
          <template v-else>{{ getValue(item) }}</template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    }, // 配置项
    data: {
      type: Object,
      required: true,
    }, // 源数据
    labelWidth: {
      type: String,
    },
    labelMinWidth: {
      type: String,
    },
    contentWidth: {
      type: String,
    },
    autoWidth: {
      type: Boolean,
      default: true,
    }, // 是否自动计算label宽度，套用最大宽
    themes: {
      type: [String, Array],
      default: "", // stripe: 斑马纹、fill: content填满区域
    },
    labelPosition: {
      type: String,
      default: "right",
    }, // label对齐方式
    height: {
      type: String,
    }, // 高度
    maxHeight: {
      type: String,
    }, // 最大高度
  },
  data() {
    return {
      autoLabelWidth: "",
      scrollHeight: undefined,
    };
  },
  watch: {
    columns() {
      this.autoLabelWidth = "";
      this.$nextTick(() => {
        this.init();
      });
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    /**初始化
     */
    init() {
      // this.getScrollHeight();
      this.autoWidth && this.computedWidth();
    },
    /**
     * @description: 设置滚动盒子高度
     */
    // getScrollHeight() {
    //   this.scrollHeight = undefined;
    //   this.$nextTick(() => {
    //     this.scrollHeight = this.$refs.CCell.offsetHeight + 10 + "px";
    //   });
    // },
    isShow(item) {
      if (typeof item.show === "undefined") {
        return true;
      } else if (typeof item.show === "function") {
        return item.show(this.data);
      } else {
        return item.show;
      }
    },
    /**
     * 自动计算最大宽度
     */
    computedWidth() {
      if (!this.columns.length) return;
      const items = this.$refs.CCell.querySelectorAll(".c-cell-item__label");
      if (items) {
        let maxWidth = 0;
        items.forEach((item) => {
          const width = item.offsetWidth;
          maxWidth < width && (maxWidth = width);
        });
        this.autoLabelWidth = maxWidth + 2 + "px";
      }
    },
    /**
     * 获取值
     */
    getValue(item) {
      let value = this.parsePath(item.key);
      if (value === undefined || value === "") {
        item.defaultValue !== undefined && (value = item.defaultValue);
      } else if (item.unit) {
        value += item.unit;
      }
      if (typeof item.render === "function") {
        value = item.render(value, this.data);
      } else if (typeof item.value === "function") {
        value = item.value(value, this.data);
      }
      return value;
    },
    /**
     * @description: 获取label值
     */
    getLabel(item, index) {
      if (typeof item.label === "function") {
        return item.label(this.data, item, index);
      }
      return item.label;
    },
    getProps(item) {
      if (typeof item.component.props === "function") {
        item.component.props = item.component.props(this.data, item);
        return item.component.props || {};
      }
      return item.component.props || {};
    },
    /**
     * 解析路径
     */
    parsePath(path) {
      if (!path) return undefined;
      path = path.toString();
      const keys = Array.isArray(path) ? path : path.split(",");
      const targets = [];
      keys.forEach((item) => {
        const splitPath = item.split(".");
        let target = this.data;
        splitPath.forEach((v) => {
          const d = v.match(/\[(.+?)\]/);
          if (d) {
            const key = v.split("[")[0];
            target = target[key][d[1]];
          } else {
            target = target[v];
          }
        });
        targets.push(target);
      });
      if (targets.length === 1) {
        return targets[0];
      }
      return targets;
    },
    /**
     * @param {*}获取类名
     */
    getClass() {
      const themes = [].concat(this.themes);
      const clas = [];
      themes
        .filter((item) => item)
        .forEach((theme) => {
          clas.push(`c-cell--${theme}`);
        });
      return clas;
    },
  },
};
</script>

<style lang="less" scoped>
.c-cell {
  display: flex;
  flex-wrap: wrap;
}
.c-cell--stripe {
  .c-cell-item {
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    &:nth-child(odd) {
      background: #f2f2f2;
    }
  }
}
.c-cell--fill {
  .c-cell-item__content {
    fill: 1;
  }
}
.c-cell-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.c-cell-item__label {
  text-align: right;
  margin-right: 10px;
}
</style>
