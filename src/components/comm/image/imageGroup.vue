<!--
 * @Description: 图片展示列表
 * @Author: cxf
 * @Date: 2020-12-10 11:04:11
 * @LastEditTime: 2021-02-08 22:42:03
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\comm\image\imageGroup.vue
-->
<template>
  <div class="c-image-group">
    <div
      class="img-item"
      v-for="(img, index) in imgs"
      :key="index"
      :style="{ width: width, height: height }"
      @click="preview(img)"
    >
      <img :src="img" />
    </div>
    <c-preview ref="preview" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array, String],
      default: ''
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
    imgs() {
      if (!this.data) return [];
      return Array.isArray(this.data) ? this.data : this.data.split(',');
    }
  },
  methods: {
    preview(url) {
      this.$refs.preview.open(
        {
          fileType: 'img'
        },
        {
          url
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.c-image-group {
  display: flex;
  justify-content: flex-start;
  .img-item {
    width: 70px;
    max-height: 70px;
    margin-right: 16px;
    background-color: #fff;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
