/*
 * @Description: 公共弹窗混入
 * @Author: cxf
 * @Date: 2020-11-10 16:58:22
 * @LastEditTime: 2021-01-11 09:32:06
 * @LastEditors: cxf
 * @FilePath: /media-source-bms/src/components/mixins/modal.js
 */
export default {
  data() {
    return {
      visible: false,
      config: {},
      loading: false,
      values: {},
      defaultValue: {},
    };
  },
  created() {
    this.defaultValue = JSON.parse(JSON.stringify(this.values));
  },
  methods: {
    /**
     * @override
     * @description: 打开
     */
    open(config = {}, values = {}) {
      this.config = Object.assign({}, this.config, config);
      this.values = Object.assign({}, this.values, values);
      this.visible = true;
      this.openCallback();
    },
    openCallback() {},
    /**
     * @override
     * @description: 关闭
     */
    close() {
      this.cancel();
    },
    /**
     * @override
     * @description: 确认
     */
    confirm() {},
    /**
     * @override
     * @description: 取消
     */
    cancel(delay = 0) {
      this.visible = false;
      return new Promise((resolve) => {
        setTimeout(() => {
          this.values = JSON.parse(JSON.stringify(this.defaultValue));
          this.config = {};
          if (this.Form) this.Form.resetValue();
          resolve();
        }, delay);
      });
    },
  },
};
