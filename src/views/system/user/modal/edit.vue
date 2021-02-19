<!--
 * @Description: 配置用户
 * @Author: cxf
 * @Date: 2020-11-10 16:55:53
 * @LastEditTime: 2021-02-19 14:53:05
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/views/system/user/modal/edit.vue
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
      <c-form :items="formItems" :form.sync="Form" theme="fill" @search="handleSearch" auto-label></c-form>
    </a-modal>
  </div>
</template>

<script>
import modalMixin from "@/components/mixins/modal.js";
import md5 from "md5";
export default {
  mixins: [modalMixin],
  data() {
    return {
      formItems: [
        {
          type: "input",
          prop: "username",
          label: "用户名"
        },
        {
          type: "password",
          prop: "password",
          label: "密码"
        },
        {
          type: "select",
          prop: "tenantId",
          label: "门店",
          search: true
        }
      ],
      Form: null,
      timer: null
    };
  },
  computed: {
    title() {
      return this.values.id ? "编辑用户" : "新增用户";
    }
  },
  methods: {
    openCallback() {
      this.getTenant();
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
          value.password = md5(value.password);
          this.$api.system.user.edit(value).then(res => {
            this.$emit("success");
            this.$message.success("操作成功");
            this.close();
          });
        }
      });
    },
    handleSearch(value, prop) {
      if (prop === "tenantId") {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getTenant(value);
        }, 100);
      }
    },
    getTenant(keyword = "") {
      this.$api.tenant
        .list({
          pageSize: 1000,
          current: 1,
          keyword
        })
        .then(data => {
          this.Form.mergeItem("tenantId", {
            data: data.rows.map(item => {
              return {
                label: item.name,
                value: item.id
              };
            })
          });
        });
    }
  }
};
</script>
