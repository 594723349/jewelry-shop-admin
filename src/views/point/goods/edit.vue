<!--
 * @Description: 
 * @Author: cxf
 * @Date: 2021-02-09 11:27:16
 * @LastEditTime: 2021-02-18 16:15:33
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
    editLayout,
  },
  data() {
    return {
      formItems: [
        {
          label: "名称",
          type: "input",
          prop: "name",
          required: true,
        },
        {
          label: "积分",
          type: "number",
          prop: "point",
          required: true,
        },
        {
          label: "商品图片",
          type: "upload",
          prop: "src",
          required: true,
          accept: "image/*",
          width: "200px",
          height: "200px",
        },
        {
          label: "描述",
          type: "editor",
          prop: "desc",
          required: true,
        },
      ],
      Form: null,
      toolbar: [
        { label: "保存", value: "save", on: this.validate },
        { label: "保存并发布", value: "publish", on: this.validate },
        { label: "取消", on: this.cancel },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$api.point.goods.detail({ id: this.id }).then((data) => {
        this.$nextTick(() => {
          data.src = this.Form.uploadUtil.format(data.src);
          this.Form.setValue(data);
        });
      });
    },
    /**
     * @description: 确认
     */
    validate(loading, btn) {
      this.Form.validate((err, value) => {
        if (!err) {
          loading(true);
          if (btn.value === "publish") {
            value.status = 1;
          }
          !value.order && (value.order = 1);
          value.src = this.Form.uploadUtil.getUrl("src")[0];
          this.$api.point.goods
            .edit({
              id: this.$route.params.id,
              ...value,
            })
            .then(() => {
              this.$message.success("添加成功");
              this.cancel();
              loading(false);
            });
        }
      });
    },
    cancel() {
      this.$router.push({ name: "pointGoods" });
    },
  },
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
