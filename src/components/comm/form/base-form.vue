<!--
 * @Description: 基础公共表单组件
 * @Author: cxf
 * @Date: 2020-01-21 17:58:42
 * @LastEditTime: 2021-02-08 22:43:07
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\comm\form\base-form.vue
 若在modal中渲染form表单，因modal只会在显示之后进行初次渲染，因为若想在打开modal后使用form表单提供的方法，
 需要等表单渲染完毕后才可使用或者可以给modal设置forceRender属性，让页面初次加载便强制渲染modal，则可不需要在$nextTick中执行
-->

<template>
  <div class="c-form" :class="themeClass">
    <slot name="before"></slot>
    <a-form ref="form" :form="cForm" :layout="layout">
      <template v-for="(formItem, index) in columns">
        <div
          v-if="Array.isArray(formItem) && handleShow(formItem)"
          :key="index"
          class="form-item-multiple"
          :class="'form-item-group-' + index"
        >
          <c-form-item
            v-for="(groupItem, groupIndex) in formItem"
            :key="groupIndex"
            :formItem="formItem"
            :index="index"
            :form="cForm"
            :autoLabelWidth="autoLabelWidth"
            :labelMinWidth="labelMinWidth"
          >
            <template
              v-if="groupItem.slot"
              :slot="groupItem.slot"
              slot-scope="{ item, decorator, handleChange }"
            >
              <slot
                :name="groupItem.slot"
                :item="item"
                :decorator="decorator"
                :handleChange="handleChange"
              ></slot>
            </template>
          </c-form-item>
        </div>
        <div v-else-if="handleShow(formItem)" class="form-item-single" :key="index">
          <div class="message-before" v-if="formItem.messageBefore">
            {{ getMessageBefore(formItem) }}
          </div>
          <c-form-item
            :formItem="formItem"
            :index="index"
            :form="cForm"
            :autoLabelWidth="autoLabelWidth"
            :labelMinWidth="labelMinWidth"
          >
            <template
              v-if="formItem.slot"
              :slot="formItem.slot"
              slot-scope="{ item, decorator, handleChange }"
            >
              <slot
                :name="formItem.slot"
                :item="item"
                :decorator="decorator"
                :handleChange="handleChange"
              ></slot>
            </template>
          </c-form-item>
        </div>
      </template>
    </a-form>
    <slot name="after"></slot>
  </div>
</template>

<script>
import formItem from './form-item';
import Moment from 'moment';
import * as formUtil from './util';
export default {
  name: 'CForm',
  components: {
    'c-form-item': formItem
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    filterUndef: {
      type: Boolean,
      default: true
    }, // 是否过滤值为undefined的字段
    defValue: {
      type: [Array, Number, String, Boolean],
      default: ''
    },
    layout: {
      type: String,
      default: 'horizontal'
    },
    form: {
      type: Object
    },
    formatTime: {
      type: Function
    },
    theme: {
      type: [String, Array],
      default: ''
    },
    autoLabel: {
      type: Boolean,
      default: false
    },
    labelMinWidth: {
      type: String
    },
    labelWidth: {
      type: String
    }
  },
  data() {
    return {
      cForm: null,
      columns: [].concat(this.items),
      fileList: [],
      model: {},
      autoLabelWidth: '',
      computedLabelWidthTimer: null
    };
  },
  watch: {
    columns() {
      if (this.autoLabel) {
        clearTimeout(this.computedLabelWidthTimer);
        this.computedLabelWidthTimer = setTimeout(() => {
          this.autoLabelWidth = 'auto';
          this.computedLabelWidth();
        }, 50);
      }
    }
  },
  computed: {
    props() {
      return formUtil.getPoprs(this.columns);
    },
    themeClass() {
      const theme = [].concat(this.theme);
      return theme.map(item => {
        return 'c-form-theme--' + theme;
      });
    }
  },
  created() {
    this.cForm = this.$form.createForm(this);
    this.$emit('update:form', this.cForm);
    this.mountedFn();
    this.$on('handleChange', this.handleChange);
    this.$on('handleInput', this.handleInput);
    this.$on('handleSearch', this.handleSearch);
    this.$on('handleUpload', this.handleUpload);
    this.$on('handelClickBtn', this.handelClickBtn);
    this.$on('saveFileList', this.saveFileList);
    this.$emit('created', this.cForm, this.renderCallback);
  },
  mounted() {
    if (this.autoLabel) this.computedLabelWidth();
    this.$emit('mounted', this.cForm, this.renderCallback);
    this.$nextTick(() => {
      this.$emit('nextTick', this.cForm, this.renderCallback);
    });
  },
  methods: {
    /**
     * 自动计算最大宽度
     */
    computedLabelWidth() {
      if (!this.columns.length) return;
      const items = this.$refs.form.$el.querySelectorAll('.label-item-text');
      let maxWidth = 0;
      items.forEach(item => {
        const width = item.offsetWidth;
        maxWidth < width && (maxWidth = width);
      });
      this.autoLabelWidth = maxWidth + 8 + 'px';
    },
    /**
     * 挂载扩展方法
     */
    mountedFn() {
      this.cForm = Object.assign(this.cForm, {
        setSelectOptions: this.setSelectOptions,
        formatDate: formUtil.formatDate,
        setItem: this.setItem,
        reset: this.reset,
        setDisabled: this.setDisabled,
        formatOptions: formUtil.formatOptions,
        setValue: this.setValue,
        resetValue: this.resetValue,
        getValue: this.getValue,
        validate: this.validate,
        mergeItem: this.mergeItem,
        mergeItems: this.mergeItems,
        computedLabelWidth: this.computedLabelWidth,
        uploadUtil: {
          getUrl: this.getImageUrls,
          format: this.formatImageList
        }
      });
    },
    /**
     * @description: 表单渲染完毕后的回调
     */
    renderCallback(callbacks) {
      callbacks = [].concat(callbacks);
      callbacks.forEach(cb => {
        cb(this.cForm);
      });
    },
    /**
     * @description: 设置值
     */
    setValue(data) {
      let model = {};
      this.props.forEach(prop => {
        let d = data[prop];
        const item = this.findItem(prop);
        if (d !== undefined && item && (item.show === undefined || item.show)) {
          if (item.type === 'date') {
            const values = [].concat(d);
            values.forEach((v, index) => {
              values[index] = Moment(v);
            });
            d = values.length === 1 ? values[0] : values;
          }
          model[prop] = d;
        }
      });
      this.cForm.setFieldsValue(model);
      Object.assign(this.model, data);
    },
    /**
     * @description: 清空值
     */
    resetValue() {
      this.cForm.resetFields();
      this.model = {};
    },
    getValue(props) {
      if (props) props = [].concat(props);
      return this.cForm.getFieldsValue(props);
    },
    getImageUrls(prop) {
      const value = this.getValue(prop);
      return value[prop].map(item => item.url);
    },
    formatImageList(urls) {
      urls = [].concat(urls);
      return urls.map((item, index) => {
        return {
          uid: new Date().getTime().toString() + Math.round(Math.random() * 1000),
          name: item,
          status: 'done',
          url: item
        };
      });
    },
    handleShow(formItem) {
      if (typeof formItem.show === 'function') {
        const values = this.getValue();
        return formItem.show(values, formItem, this.cForm);
      }
      return formItem.show === undefined || formItem.show;
    },
    /**
     * @description: 当表单值改变时，循环触发表单配置项中定义的方法
     */
    // observe() {
    //   const values = this.getValue();
    //   this.columns.forEach(column => {
    //     Object.keys(column).forEach(key => {
    //       if (typeof column[key] === 'function') {
    //         column[key](values, column, this.cForm);
    //       }
    //     })
    //   })
    // },
    /**
     * 表单值改变的回调
     */
    handleChange(value, formItem, extraValue) {
      const { prop, type } = formItem;
      // this.observe();
      this.$emit('change', value, prop, type, extraValue);
    },
    /**
     * 表单值改变的回调
     */
    handleInput(value, oldValue, formItem) {
      const { prop, type } = formItem;
      this.$emit('input', value, oldValue, prop, type);
    },
    /**
     * @description: 搜索回调
     */
    handleSearch(value, formItem) {
      const { prop, type } = formItem;
      this.$emit('search', value, prop, type);
    },
    /**
     * @description: 上传回调
     */
    handleUpload(value, formItem) {
      const { prop, type } = formItem;
      this.$emit('change', value, prop, type);
    },
    /**
     * 确定
     */
    handleSubmit(clickEvent, done) {
      this.cForm.validateFields((err, values) => {
        values = Object.assign(this.model, this.formatData(values));
        clickEvent(err, values, done);
      });
    },
    /**
     * 表单按钮点击事件
     */
    handelClickBtn(btnConf, done) {
      const { validator, clickEvent, type } = btnConf;
      if (validator) {
        this.handleSubmit(clickEvent, done);
      } else {
        const values = Object.assign(this.model, this.cForm.getFieldsValue());
        typeof clickEvent === 'function' && clickEvent(values, done);
        type === 'reset' && this.cForm.resetFields();
      }
    },
    /**
     * 合并配置
     */
    mergeItem(prop, obj) {
      let index = this.findItem(prop, 'prop', 'index');
      this.$set(this.columns, index, Object.assign(this.columns[index], obj));
    },
    /**
     * @description: 合并多个配置项
     */
    mergeItems(data, cb) {
      data = [].concat(data);
      data.forEach(item => {
        this.mergeItem(item.prop, item.data);
      });
      this.$nextTick(() => {
        typeof cb === 'function' && cb();
      });
    },
    /**
     * 格式化参数
     */
    formatData(values) {
      if (typeof values !== 'object') return values;
      let obj = Object.assign({}, this.model);
      for (let k in values) {
        let val = values[k];
        if (val !== undefined) {
          if (val instanceof Moment) {
            // 转换时间
            const item = this.findItem(k);
            let format = formUtil.getDateFormat(item);
            val = val.format(format);
            if (typeof item.formatDate === 'function') {
              val = item.formatDate(val);
            } else if (typeof this.formatTime === 'function') {
              val = formUtil.formatDate(val);
            }
          }
          obj[k] = val;
        } else {
          !this.filterUndef && (obj[k] = this.defValue);
        }
      }
      return obj;
    },
    /**
     * 给select组件添加下拉数据
     * @param {Array} data 下拉数据
     * @param {String, Array} prop 目标key
     * @param {Array} keys 要取值的key
     */
    setSelectOptions(data, prop, keys) {
      if (!Array.isArray(this.columns)) return;
      data = data.map((item, index) => {
        if (!Array.isArray(keys)) {
          return {
            label: item,
            value: index
          };
        } else {
          return {
            label: item[keys[0]],
            value: item[keys[1]]
          };
        }
      });
      prop = Array.isArray(prop) ? prop : [prop];
      let max = prop.length;
      let num = 0;
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i];
        if (prop.indexOf(item.prop) !== -1) {
          this.$set(this.columns[i], 'data', data);
          num++;
          if (num === max) break;
        }
      }
    },
    /**
     * 将全局常量值转成符合下拉或复选的数据模式
     */
    formatOptions(data) {
      return formUtil.formatOptions(data);
    },
    /**
     * 通过prop值更新item任一字段值
     * @param {String} prop prop值
     * @param {String} key 要修改的字段
     * @param {Any} data 修改的值
     */
    setItem(props, key, data) {
      if (data === '') data = undefined;
      props = [].concat(props);
      let isString = !Array.isArray(key);
      props.forEach(k => {
        let item = this.findItem(k, 'prop');
        if (item) {
          this.$set(item, key, data);
        }
      });
    },
    /**
     * @description: 查找单个item
     * @param {*} value
     * @param {*} key
     * @param {*} type
     * @return {Number, Object}
     */
    findItem(value, key = 'prop', type = 'data') {
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i];
        if (item[key] === value) {
          return type === 'data' ? item : i;
        }
      }
    },
    /**
     * 保存文件上传控件中的fileList变量
     */
    saveFileList(list) {
      this.fileList.push(list);
    },
    /**
     * 清空fileList中的数据
     */
    clearFileList() {
      this.fileList.forEach(item => {
        item.splice(0);
      });
    },
    /**
     * 重置
     */
    reset(params) {
      this.cForm.resetFields(params);
      this.clearFileList();
    },
    /**
     * 设置禁用
     * @param {Array,String} props
     * @param {Boolean} isDisabled // 是否禁用
     * @param {Boolean} isClear 禁用后是否清除数据
     */
    setDisabled(props, isDisabled, isClear = true) {
      props = !Array.isArray(props) ? [props] : props;
      isClear && isDisabled && this.cForm.resetFields(props);
      props.forEach(prop => {
        const index = this.findItem(prop, 'prop', 'index');
        this.$set(this.columns[index], 'disabled', isDisabled);
      });
    },
    /**
     * @description: 校验
     */
    validate(fn) {
      this.handleSubmit(fn);
    },
    /**
     * @description: 获取前置提示语
     */
    getMessageBefore(formItem) {
      const { messageBefore, prop, label } = formItem;
      if (typeof messageBefore === 'function') {
        return formItem.messageBefore({ prop, label });
      }
      return messageBefore;
    }
  }
};
</script>
<style lang="less" scoped>
.c-form-theme--fill {
  /deep/ .ant-form-item {
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
}
.ant-form-horizontal {
  .ant-row {
    display: flex;
    flex-wrap: wrap;
  }
}
.form-item-multiple {
  .flex(flex-start, row, wrap, baseline);
  .ant-form-item {
    flex: 1;
  }
}
.form-item-single:last-child {
  margin-bottom: 0;
}
.message-before {
  margin-bottom: 16px;
}
</style>
