<!--
 * @Description: 素材预览Modal
 * @Author: cxf
 * @Date: 2020-07-08 16:35:45
 * @LastEditTime: 2021-02-08 21:46:57
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\comm\modal\preview.vue
-->
<template>
  <a-modal
    :title="'查看' + (config.fileType === 'img' ? '图片' : '视频')"
    v-model="visible"
    :footer="null"
    :width="700"
    :bodyStyle="{ maxHeight: '700px', textAlign: 'center' }"
    wrapClassName="tm-modal"
    :zIndex="99999"
  >
    <img v-if="config.fileType === 'img'" :src="values.url" class="preview-content" />
  </a-modal>
</template>

<script>
import modalMixin from '@/components/mixins/modal';

export default {
  mixins: [modalMixin],
  components: {},
  data() {
    return {
      values: {
        url: ''
      }
    };
  }
};
</script>
<style lang="less" scoped>
.preview-content {
  max-width: 653px;
  max-height: 375px;
  display: inline-block;
}

.preview-content-video {
  width: 669px;
  height: 375px;
  display: inline-block;
}
</style>
