<!--
 * @Description: 公共上传
 * @Author: cxf
 * @Date: 2020-12-31 13:41:25
 * @LastEditTime: 2021-02-18 16:14:59
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/components/comm/upload/index.vue
-->
<template>
  <div class="c-upload">
    <a-upload
      ref="upload"
      :list-type="listType"
      :multiple="multiple"
      action
      :beforeUpload="beforeUpload"
      :customRequest="handleCustomRequest"
      :fileList="fileList"
      :accept="accept"
      :remove="remove"
      :showUploadList="showUploadList"
      :change="handleChange"
      :style="{ display: 'inline-block' }"
      @preview="handlePreview"
    >
      <div class="upload-box" v-if="!isMax" :style="{ width: width, height: height }">
        <div class="upload-area">
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">{{ placeholder }}</div>
        </div>
      </div>
    </a-upload>
    <priview ref="priview" />
  </div>
</template>

<script>
import priview from "@/components/comm/modal/preview.vue";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  components: {
    priview,
  },
  props: {
    value: {
      type: [String, Array],
      default: () => [],
    },
    accept: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    width: {
      type: String,
      default: "86px",
    },
    height: {
      type: String,
      default: "86px",
    },
    listType: {
      type: String,
      default: "picture-card",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    showUploadList: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 1,
    },
    customRequest: {
      type: Function,
    },
    params: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      fileList: [],
      uploadingFile: [],
      uploadNum: 0,
      previewVisible: "",
      previewVisible: false,
    };
  },
  watch: {
    value(now) {
      this.fileList = now.map((item) => {
        item.status = "done";
        return item;
      });
    },
  },
  computed: {
    isMax() {
      if (typeof this.max === "undefined") {
        return false;
      }
      return this.fileList.length >= this.max;
    },
  },
  methods: {
    /**
     * @description: 上传前的拦截校验
     */
    beforeUpload(file, fileList) {
      this.uploadingFile = fileList;
      return true;
    },
    /**
     * @description: 自定义上传
     */
    async handleCustomRequest({ file }) {
      const index = this.getCurrentIndex(file);
      const uploadParams = await this.$api.media.getUploadToken({
        key: file.name,
      });
      const formData = new FormData();
      formData.append("token", uploadParams.token);
      formData.append("key", file.name);
      formData.append("file", file);
      this.$api.media.upload(uploadParams.uploadUrl, formData).then(async () => {
        this.$set(this.fileList, index, {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: uploadParams.src,
        });
        this.handleChange();
      });
    },
    handleChange() {
      this.$emit("change", this.fileList);
    },
    handlePreview(file) {
      this.$refs.priview.open({ fileType: "img" }, { url: file.url });
    },
    /**
     * @description: 移除
     */
    remove(file) {
      const { uid } = file;
      for (let index = 0; index < this.fileList.length; index++) {
        const item = this.fileList[index];
        if (item.uid === uid) {
          this.fileList.splice(index);
          if (this.uploadingFile[index].uid === uid) {
            this.uploadingFile.splice(index);
          }
          break;
        }
      }
    },
    /**
     * @description: 设置loading
     */
    setLoading(status = true) {
      this.loading = status;
    },
    /**
     * @description: 获取当前上传到第几个文件了
     */
    getCurrentIndex(file) {
      for (let i = 0; i < this.uploadingFile.length; i++) {
        const currentFile = this.uploadingFile[i];
        if (currentFile.uid === file.uid) {
          return i;
        }
      }
      return -1;
    },
    /**
     * @description: 重置
     */
    reset() {
      this.loading = false;
      this.fileList = [];
      this.uploadingFile = [];
      this.uploadNum = 0;
    },
    /**
     * @description: 手动上传
     */
    submit() {
      this.$refs.upload.$el.querySelector("input").click();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-upload {
  width: 100%;
  height: 100%;
}
.upload-area {
  display: table-cell;
  width: 100%;
  height: 100%;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
  i {
    font-size: 32px;
    color: #999;
  }
}
.upload-box {
  display: table;
  float: left;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  // border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #1890ff;
  }
}
</style>
