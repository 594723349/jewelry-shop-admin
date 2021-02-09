<!--
 * @Description: 
 * @Author: cxf
 * @Date: 2021-02-09 11:27:16
 * @LastEditTime: 2021-02-09 13:51:55
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/views/point/goods/edit.vue
-->
<template>
  <div>
    <edit-layout ref="editPage" :toolbar="toolbar">
      <c-form :items="formItems" :form.sync="Form" theme="fill" auto-label></c-form>
    </edit-layout>
  </div>
</template>

<script>
import editLayout from "@/components/layout/editLayout.vue";
export default {
  components: {
    editLayout
  },
  data() {
    return {
      formItems: [
        {
          label: "名称",
          type: "input",
          prop: "name",
          required: true
        },
        {
          label: "积分",
          type: "number",
          prop: "point",
          required: true
        },
        {
          label: "描述",
          type: "textarea",
          prop: "desc",
          row: 4,
          required: true
        },
        {
          label: "商品图片",
          type: "upload",
          prop: "src",
          required: true,
          accept: "image/*"
        }
      ],
      Form: null,
      toolbar: [
        { label: "保存", value: "save", on: this.validate },
        { label: "保存并发布", value: "publish", on: this.validate },
        { label: "取消", on: this.cancel }
      ]
    };
  },
  methods: {
    getDetail() {
      this.Form.uploadUtil.format(this.values.src);
      this.Form.setValue(this.values);
    },
    /**
     * @description: 确认
     */
    confirm(loading, btn) {
      this.Form.validate((err, value) => {
        if (!err) {
          loading(true);
          if (btn.value === "publish") {
            value.status = 1;
          }
          value.src = this.Form.uploadUtil.getUrl("src")[0];
          this.$api.point.goods
            .edit({
              id: this.values.id,
              ...value
            })
            .then(() => {
              this.$message.success("添加成功");
              this.close();
              loading(false);
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .c-form {
  .ant-form-item {
    margin-bottom: 16px;
  }
  .form-item-single:last-child .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-amount {
    .ant-input-group-addon {
      background-color: transparent;
      border: none;
    }
  }
}
</style>
