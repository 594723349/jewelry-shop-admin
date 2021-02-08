<template>
  <div>
    <a-modal
      wrapClassName="c-modal c-modal--large"
      :title="title"
      :visible="visible"
      :confirm-loading="loading"
      :width="520"
      okText="提交"
      cancelText="关闭"
      @cancel="close"
      @ok="confirm"
    >
      <c-form :items="formItems" :form.sync="Form" theme="fill" auto-label></c-form>
    </a-modal>
  </div>
</template>

<script>
import modalMixin from '@/components/mixins/modal.js';

export default {
  mixins: [modalMixin],
  data() {
    return {
      formItems: [
        {
          label: '名称',
          type: 'input',
          prop: 'name',
          required: true
        },
        {
          label: '积分',
          type: 'number',
          prop: 'point',
          required: true
        },
        {
          label: '描述',
          type: 'textarea',
          prop: 'desc',
          row: 4,
          required: true
        },
        {
          label: '商品图片',
          type: 'upload',
          prop: 'src',
          required: true,
          accept: 'image/*'
        }
      ],
      Form: null
    };
  },
  computed: {
    title() {
      return this.values.id ? '编辑积分商品' : '新增积分商品';
    }
  },
  methods: {
    openCallback() {
      this.$nextTick(() => {
        this.values.src = this.Form.uploadUtil.format(this.values.src);
        this.values.id && this.Form.setValue(this.values);
      });
    },
    /**
     * @description: 确认
     */
    confirm() {
      this.Form.validate((err, value) => {
        if (!err) {
          value.src = this.Form.uploadUtil.getUrl('src')[0];
          this.$api.point.goods
            .edit({
              id: this.values.id,
              ...value
            })
            .then(() => {
              this.$emit('success');
              this.$message.success('添加成功');
              this.close();
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
