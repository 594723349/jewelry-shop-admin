<!--
 * @Description: 配置用户
 * @Author: cxf
 * @Date: 2020-11-10 16:55:53
 * @LastEditTime: 2021-02-19 10:13:23
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/views/tenants/modal/edit.vue
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
      <c-form :items="formItems" :form.sync="Form" theme="fill"></c-form>
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
          type: "input",
          prop: "name",
          label: "门店"
        }
      ],
      Form: null
    };
  },
  computed: {
    title() {
      return this.values.id ? "编辑门店" : "新增门店";
    }
  },
  methods: {
    openCallback() {
      this.$nextTick(() => {
        this.Form.setValue(this.values);
      });
    },
    /**
     * @description: 确认
     */
    confirm() {
      this.Form.validate((err, value) => {
        if (!err) {
          this.$api.tenant.edit(value).then(res => {
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
