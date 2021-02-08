<!--
 * @Description: 卡片【照片墙】
 * @Author: cxf
 * @Date: 2020-11-17 16:05:13
 * @LastEditTime: 2020-11-20 10:10:25
 * @LastEditors: cxf
 * @FilePath: /media-source-bms/src/components/comm/card/card.vue
-->
<template>
  <div class="c-card" :class="{'is-disabled': disabled}">
    <a-card :bordered="border">
      <a-card-grid
        v-for="(item, index) in items"
        :key="index"
        :style="{'width': width}"
        :class="{'active': item[defaultProps.key] === now}"
        @click="handleClick(item)"
        :hoverable="hoverable"
      >
        <img class="cover" :ref="'img-' + index" :src="item[defaultProps.value]" />
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number]
    },
    mode: {
      type: String,
      default: "img"
    },
    border: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "33%"
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          key: "key",
          value: "value"
        };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      now: this.value
    };
  },
  watch: {
    value(now) {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items;
        if (item[this.defaultProps.key] === now) {
          this.now = i;
          break;
        }
      }
    }
  },
  computed: {
    items() {
      return this.data.map((item, index) => {
        if (typeof item === "object") {
          return item;
        } else {
          return {
            [this.defaultProps.value]: item,
            [this.defaultProps.key]: index
          };
        }
      });
    }
  },
  methods: {
    handleClick(item) {
      const { key, value } = this.defaultProps;
      this.now = item[key];
      if (this.fullscreen) {
        this.$refs["img-" + index][0].requestFullscreen();
      }
      this.$emit("change", item[key]);
    }
  }
};
</script>

<style lang="less" scoped>
.cover {
  width: 100%;
}
.is-disabled{
  .ant-card-grid{
    cursor: not-allowed;
  }
}
</style>
