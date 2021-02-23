<!--
 * @Description: 配置用户
 * @Author: cxf
 * @Date: 2020-11-10 16:55:53
 * @LastEditTime: 2021-02-23 16:32:29
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/views/registerUser/modal/edit.vue
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
          type: "radio",
          prop: "role",
          label: "角色",
          data: []
        }
      ],
      Form: null
    };
  },
  computed: {
    title() {
      return this.values.id ? "编辑用户" : "新增用户";
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    openCallback() {
      this.formItems[0].data = [
        {
          label: "普通会员",
          value: 0
        },
        {
          label: "门店管理员",
          value: this.userInfo.tenantId
        }
      ];
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
          this.$api.registerUser.edit(value).then(res => {
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
