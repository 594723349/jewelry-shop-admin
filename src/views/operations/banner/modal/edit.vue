<!--
 * @Description: 配置用户
 * @Author: cxf
 * @Date: 2020-11-10 16:55:53
 * @LastEditTime: 2021-02-25 15:22:34
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/views/operations/banner/modal/edit.vue
-->
<template>
  <div>
    <a-modal
      wrapClassName="c-modal"
      :title="title"
      :visible="visible"
      :confirm-loading="loading"
      :width="500"
      @cancel="cancel"
      @ok="confirm"
    >
      <c-form :items="formItems" :form.sync="Form" theme="fill" auto-label></c-form>
    </a-modal>
  </div>
</template>

<script>
import modalMixin from "@/components/mixins/modal.js";
export default {
  mixins: [modalMixin],
  data() {
    return {
      formItems: [
        {
          type: "select",
          prop: "position",
          label: "位置",
          selectType: "banner",
          required: true
        },
        {
          label: "banner图",
          type: "upload",
          prop: "url",
          required: true,
          accept: "image/*",
          width: "200px",
          height: "200px"
        }
      ],
      Form: null
    };
  },
  computed: {
    title() {
      return this.values.id ? "编辑banner" : "新增banner";
    }
  },
  methods: {
    openCallback() {
      this.$nextTick(() => {
        if (this.values.id) {
          this.values.url = this.Form.uploadUtil.format(this.values.url);
          this.Form.setValue(this.values);
        }
      });
    },
    /**
     * @description: 确认
     */
    confirm() {
      this.Form.validate((err, value) => {
        if (!err) {
          value.url = this.Form.uploadUtil.getUrl("url")[0];
          this.$api.operations.banner.edit(value).then(res => {
            this.$emit("success");
            this.$message.success("操作成功");
            this.close();
          });
        }
      });
    }
  }
};
</script>
