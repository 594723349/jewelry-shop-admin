<!--
 * @Description: 富文本编辑器
 * @Author: cxf
 * @Date: 2021-01-22 13:39:06
 * @LastEditTime: 2021-02-18 15:55:39
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/components/comm/editor/index.vue
-->
<template>
  <div class="c-editor">
    <div id="editor"></div>
    <div class="text-length" v-if="maxLength">
      <label :style="{ color: currentLength > maxLength ? 'red' : '#000' }">{{
        currentLength
      }}</label>
      /{{ maxLength }}
    </div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
import sha1 from "sha1";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    maxLength: {
      type: Number,
    },
  },
  data() {
    return {
      editor: null,
      currentLength: 0,
      hashCode: "",
      timer: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * @description: 初始化
     */
    init() {
      const editor = new wangEditor(`#editor`);
      this.mergeConfig(this.config, editor);
      editor.config.placeholder = this.placeholder;
      editor.config.onchange = this.onChange;
      editor.config.customUploadImg = this.customUpload;
      editor.create();
      this.editor = editor;
    },
    /**
     * @description: 自定义上传
     */
    customUpload(files, insertImgFn) {
      files.forEach(async (file) => {
        const uploadParams = await this.$api.media.getUploadToken({
          key: file.name,
        });
        const formData = new FormData();
        formData.append("token", uploadParams.token);
        formData.append("key", file.name);
        formData.append("file", file);
        this.$api.media.upload(uploadParams.uploadUrl, formData).then(async () => {
          insertImgFn(uploadParams.src);
        });
      });
    },
    mergeConfig(config, editor = this.editor) {
      for (let k in config) {
        editor.config[k] = config[k];
      }
    },
    /**
     * @description: 监听值变化
     */
    onChange(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.maxLength) {
          this.currentLength = this.editor.txt.text().length;
        }
        this.hashCode = this.getHash(value);
        this.$emit("change", value);
      }, 200);
    },
    /**
     * @description: 获取字符串的哈希值，用于对比两个长字符串是否相等
     */
    getHash(str) {
      return sha1(str);
    },
  },
  watch: {
    value(now) {
      let hash = this.getHash(now);
      if (hash !== this.hashCode) {
        // 执行该方法会将光标重置到最后
        this.editor.txt.html(now);
      }
    },
    config(now) {
      this.mergeConfig(this.config, now);
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style lang="less" scoped>
.c-editor {
  position: relative;
  .text-length {
    text-align: right;
    position: absolute;
    z-index: 99999;
    bottom: -23px;
    right: 10px;
    height: 20px;
    line-height: 20px;
  }
}
/deep/ #editor {
  .w-e-text ul {
    list-style: disc outside none;
  }
}
</style>
