<!--
 * @Description: 表单控件
 * @Author: cxf
 * @Date: 2020-01-21 17:58:42
 * @LastEditTime: 2021-02-08 22:30:31
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\comm\form\form-item.vue
-->

<template>
  <a-form-item class="comm-form-item" :class="setClass(formItem)">
    <template v-if="formItem.label" #label>
      <span
        class="label-item"
        :style="{
          width: autoLabelWidth || formItem.labelWidth || labelWidth,
          minWidth: formItem.labelMinWidth || labelMinWidth
        }"
      >
        <label class="label-item-text">{{ formItem.label || '' }}</label>
      </span>
    </template>
    <div class="field-box" :class="setFieldClass()">
      <!-- <div class="prompt-before" v-if="formItem.promptBefore">{{ getPromptBefore() }}</div> -->
      <!-- 操作 -->
      <template v-if="formItem.type === 'action'">
        <div class="btn-group" :class="[formItem.layout, formItem.align || 'left']">
          <a-button
            v-for="(btn, btnIndex) in formatBtnModel(formItem)"
            :icon="formItem.icon"
            :key="btnIndex"
            :type="btn.theme || 'primary'"
            :class="[btn.color]"
            :size="btn.size"
            :loading="btn.loading"
            @click.prevent="handelClickBtn(btn)"
            >{{ btn.label }}</a-button
          >
        </div>
      </template>
      <!-- 纯文本 -->
      <template v-else-if="formItem.type === 'text'">
        <a-input v-decorator="setDecorator(formItem)" :addon-before="formItem.addonBefore" disabled></a-input>
      </template>
      <!-- 输入框 -->
      <template
        v-else-if="formItem.type === 'input' || formItem.type === 'password' || formItem.type === 'number'"
      >
        <a-input
          :autocomplete="formItem.autocomplete || 'off'"
          v-decorator="setDecorator(formItem)"
          :type="getInputType()"
          :disabled="formItem.disabled"
          :placeholder="setPlaceholder()"
          :allowClear="true"
          :class="{ 'show-word-limt': formItem.showWordLimit }"
          :maxLength="formItem.maxLength"
          :addon-before="formItem.addonBefore"
          :addon-after="formItem.addonAfter"
          :style="{ width: formItem.width }"
          @input="handleInput"
          @change="handleChange(formItem)"
        >
          <span
            v-if="formItem.showWordLimit"
            class="word-limt"
            :class="{ 'is-max': value.length >= formItem.maxLength }"
            slot="suffix"
            >{{ value.length }}/{{ formItem.maxLength }}</span
          >
        </a-input>
        <div class="tips" v-if="formItem.tips" v-html="formItem.tips"></div>
      </template>
      <!-- 文本域 -->
      <template v-else-if="formItem.type === 'textarea'">
        <a-textarea
          v-decorator="setDecorator(formItem)"
          :disabled="formItem.disabled"
          :placeholder="setPlaceholder()"
          :allowClear="formItem.allowClear !== undefined ? formItem.allowClear : true"
          @change="handleChange(formItem)"
          :rows="formItem.row || 3"
          :maxLength="formItem.maxLength"
          :autoSize="formItem.autoSize || false"
          :style="{ width: formItem.width }"
        />
      </template>
      <!-- 下拉框 -->
      <template v-else-if="formItem.type === 'select'">
        <a-select
          v-decorator="setDecorator(formItem)"
          :showSearch="formItem.search !== undefined ? formItem.search : false"
          :disabled="formItem.disabled"
          :mode="formItem.mode || 'default'"
          :placeholder="setPlaceholder()"
          :filterOption="formItem.filterOption || selectFilterOption"
          :labelInValue="formItem.labelInValue"
          :maxTagCount="formItem.maxTagCount"
          :allowClear="formItem.allowClear !== undefined ? formItem.allowClear : true"
          @popupScroll="popupScroll"
          @change="handleChange(formItem)"
          @search="handleSearch"
          :style="{ width: formItem.width }"
        >
          <a-select-option
            v-for="(selectOption, optionIndex) in formItemData(formItem.data)"
            :key="optionIndex"
            :value="selectOption.value"
            >{{ selectOption.label }}</a-select-option
          >
        </a-select>
      </template>
      <!-- 复选框 -->
      <template v-else-if="formItem.type === 'checkbox'">
        <a-checkbox-group
          v-decorator="setDecorator(formItem)"
          :disabled="formItem.disabled"
          :options="formItemData(formItem.data)"
          @change="handleChange(formItem)"
        ></a-checkbox-group>
      </template>
      <!-- 单选框 -->
      <template v-else-if="formItem.type === 'radio'">
        <a-radio-group
          v-decorator="setDecorator(formItem)"
          :disabled="formItem.disabled"
          @change="handleChange(formItem)"
        >
          <a-radio
            v-for="(radioItem, radioItemIndex) in formItemData(formItem.data)"
            :key="radioItemIndex"
            :value="radioItem.value"
            >{{ radioItem.label }}</a-radio
          >
        </a-radio-group>
      </template>
      <!-- 日期选择框 -->
      <template v-else-if="formItem.type === 'date'">
        <a-range-picker
          v-if="formItem.mode === 'range'"
          v-decorator="setDecorator(formItem)"
          :showTime="formItem.showTime"
          :format="getDateFormat(formItem)"
          @change="handleChange(formItem)"
          :style="{ width: formItem.width }"
        />
        <a-date-picker
          v-else
          v-decorator="setDecorator(formItem)"
          :disabled="formItem.disabled"
          :placeholder="setPlaceholder()"
          :format="getDateFormat(formItem)"
          :showTime="formItem.showTime"
          @change="handleChange(formItem)"
          :style="{ width: formItem.width }"
        />
      </template>
      <!-- 卡片 -->
      <template v-else-if="formItem.type === 'card'">
        <c-card
          v-decorator="setDecorator(formItem)"
          :data="formItem.data"
          :mode="formItem.mode"
          :current="formItem.current"
          :width="formItem.width"
          :defaultProps="formItem.config"
          :disabled="formItem.disabled"
          @change="handleChange(formItem)"
        ></c-card>
      </template>
      <!-- 富文本编辑器 -->
      <template v-else-if="formItem.type === 'editor'">
        <c-editor
          v-decorator="setDecorator(formItem)"
          :max-length="formItem.maxLength"
          :config="formItem.config"
          :placeholder="setPlaceholder()"
        ></c-editor>
      </template>
      <!-- 级联选择器 -->
      <template v-else-if="formItem.type === 'cascader'">
        <a-cascader
          v-decorator="setDecorator(formItem)"
          :options="formItemData(formItem.data)"
          @change="handleChange(formItem)"
          :loadData="cascaderLoadData"
          :placeholder="setPlaceholder()"
          changeOnSelect
        />
      </template>
      <!-- 上传 -->
      <template v-else-if="formItem.type === 'upload'">
        <c-upload
          v-decorator="setDecorator(formItem)"
          :width="formItem.width"
          :height="formItem.height"
          :accept="formItem.accept"
          :max="formItem.max"
          :multiple="formItem.multiple"
          @change="handleChange(formItem)"
        ></c-upload>
      </template>
      <!-- 地图 -->
      <template v-else-if="formItem.type === 'map'">
        <!-- 下拉选择地图 -->
        <c-select-map v-if="formItem.mode === 'select'" v-decorator="setDecorator(formItem)"></c-select-map>
      </template>
      <template v-else-if="formItem.type === 'city'">
        <c-city ref="city" v-decorator="setDecorator(formItem)" @change="handleChange(formItem)"></c-city>
      </template>
      <!-- 自定义插槽 -->
      <template v-else-if="formItem.slot">
        <slot
          :name="formItem.slot"
          :item="formItem"
          :decorator="setDecorator(formItem)"
          :handleChange="handleChange"
        ></slot>
      </template>
      <div class="prompt" v-if="formItem.prompt">{{ formItem.prompt }}</div>
    </div>
  </a-form-item>
</template>

<script>
import { getDateFormat, isJSON, formatInputValue } from './util';
import Moment from 'moment';
import CEditor from '@/components/comm/editor/index';
import CSelectMap from '@/components/comm/Map/SelectMap.vue';
import CCity from '@/components/comm/city';
import upload from '@/components/comm/upload/index';
export default {
  name: 'CFormItem',
  components: {
    'c-editor': CEditor,
    'c-select-map': CSelectMap,
    'c-city': CCity,
    'c-upload': upload
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    index: {
      type: Number
    },
    form: {
      type: Object
    },
    autoLabelWidth: {
      type: String
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
      loading: false,
      value: ''
    };
  },
  created() {
    if (this.formItem.type === 'select') {
      this.popupScroll();
    }
  },
  methods: {
    /**
     * 设置表单控件的绑定
     */
    setDecorator(formItem) {
      let { prop, options, rules = [], defaultValue, type, data, required, label } = formItem;
      if (type === 'date' && defaultValue) {
        let val = typeof defaultValue === 'number' ? new Date(defaultValue * 1000) : defaultValue;
        defaultValue = Moment(val);
      }
      if (required) {
        rules = rules.concat({
          required: true,
          message: this.getFixedPlaceholder(type)
        });
      }
      return [prop, { rules, initialValue: defaultValue, ...options }];
    },
    /**
     * @description: 格式化data
     */
    formItemData(data) {
      if (typeof data === 'function') {
        data = data(this.formItem);
        if (isJSON(data)) {
          const { label = 'label', value = 'value', data: d } = data;
          return d.map(item => {
            return {
              label: item[label],
              value: item[value]
            };
          });
        }
        return data;
      } else {
        if (this.formItem.type === 'cascader') {
          data.forEach((item, index) => this.$set(data[index], 'isLeaf', false));
        }
        return data;
      }
      return data;
    },
    /**
     * @description: 下拉滚动监听
     */
    popupScroll() {
      if (typeof this.formItem.onScroll === 'function') {
        const newArr = Array.isArray(this.formItem.data) ? [].concat(this.formItem) : [];
        this.formItem.onScroll(newData => {
          this.formItem.data = newArr.concat(newData);
        }, newArr);
      }
    },
    /**
     * @description: 获取input输入框type类型
     */
    getInputType() {
      const { type } = this.formItem;
      switch (type) {
        case 'password':
          return 'password';
        case 'number':
          return 'number';
        case 'input':
        default:
          return 'text';
      }
    },
    /**
     * 设置提示语
     */
    setPlaceholder() {
      const { type, disabled, placeholder } = this.formItem;
      if (disabled) {
        return '';
      } else if (placeholder) {
        return placeholder;
      }
      return this.getFixedPlaceholder(type);
    },
    /**
     * @description: 获取默认提示语
     */
    getFixedPlaceholder(type) {
      let str = '';
      if (type === 'select') {
        str = '请选择';
      } else if (type === 'upload') {
        str = '请上传';
      } else {
        str = '请输入';
      }
      return str + this.formItem.label;
    },
    getDateFormat(formItem) {
      return getDateFormat(formItem);
    },
    /**
     * 设置类名
     */
    setClass(formItem) {
      const { onlyRead, prop, type } = formItem;
      let classs = [formItem.class, 'ant-form-item-' + (prop || 'prop'), 'ant-form-item-' + (type || 'type')];
      onlyRead && classs.push('disabled-hidden');
      return classs;
    },
    /**
     * @description: 设置表单控件盒子类名
     */
    setFieldClass() {
      const { align = 'bottom', layout = 'vertical', type } = this.formItem;
      if (type === 'action') {
        return [];
      } else {
        return [`field-box--${align}`, `field-box--${layout}`];
      }
    },
    /**
     * 表单按钮点击事件
     */
    handelClickBtn(btnConf) {
      this.dispatch('CForm', 'handelClickBtn', btnConf, done => {
        this.setLoading(done, btnConf);
      });
    },
    /**
     * @description: 更新按钮loading状态
     */
    setLoading(done = false, btnConf) {
      this.$set(btnConf, 'loading', done);
    },
    /**
     * 格式化按钮操作列
     */
    formatBtnModel(formItem) {
      if (!formItem.btns) {
        return [];
      } else if (Array.isArray(formItem.btns)) {
        return formItem.btns;
      } else {
        return [formItem.btns];
      }
    },
    /**
     * 表单值改变的回调
     */
    handleChange(formItem) {
      setTimeout(() => {
        this.value = this.getValue();
        let extraValue = undefined;
        if (formItem.type === 'city') {
          extraValue = this.$refs.city.getLabel();
        }
        this.dispatch('CForm', 'handleChange', this.value, formItem, extraValue);
      }, 0);
    },
    /**
     * @description: 表单值输入时
     */
    handleInput(value) {
      let oldValue = value.target.value;
      value = formatInputValue(this.formItem.modelType, oldValue);
      this.form.setValue(
        {
          [this.formItem.prop]: value
        },
        false
      );
      this.dispatch('CForm', 'handleInput', value, oldValue, this.formItem);
    },
    /**
     * @description: 上传修改回调
     */
    handleUpload(value) {
      this.dispatch('CForm', 'handleUpload', value, this.formItem);
    },
    /**
     * @description: 搜索
     */
    handleSearch(value) {
      this.dispatch('CForm', 'handleSearch', value, this.formItem);
    },
    /**
     * @description: 获取至
     */
    getValue() {
      return this.form.getFieldValue(this.formItem.prop);
    },
    /**
     * 下拉搜索
     */
    selectFilterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    /**
     * 级联选择异步数据回调
     */
    cascaderLoadData(selectedOptions) {
      const { loadData } = this.formItem;
      if (typeof loadData === 'function') {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        if (!targetOption.children) {
          loadData(targetOption, selectedOptions);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .ant-form-item-label {
  .label-item {
    display: inline-block;
  }
  .ant-form-item-required {
    &::before {
      display: none;
    }
    .label-item::before {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }
}
.btn-group.left {
  .ant-btn {
    margin-right: 10px;
  }
}
.btn-group.right {
  text-align: right;
  .ant-btn {
    margin-left: 10px;
  }
}
.ant-upload {
  img {
    width: 102px;
    height: 102px;
  }
}
.word-limt {
  margin-left: 10px;
  &.is-max {
    color: red;
  }
}
.tips {
  line-height: 26px;
}
.disabled-hidden {
  /deep/ .ant-input-disabled,
  /deep/ .ant-select-disabled .ant-select-selection {
    color: rgba(0, 0, 0, 0.65);
    background-color: transparent;
    cursor: default;
    opacity: 1;
    border: none;
    &:hover {
      border: none;
    }
    .ant-select-arrow {
      display: none;
    }
  }
  /deep/ .ant-calendar-picker-input.ant-input-disabled + i {
    display: none;
  }
}
.ant-form-item-text {
  /deep/ .ant-input-group-addon,
  /deep/ .ant-input-disabled {
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    background-color: transparent;
    cursor: default;
    border: none;
  }
}
/deep/ .ant-card-contain-grid {
  .ant-card-grid {
    box-shadow: none;
    padding: 10px;
  }
}
.ant-form-item-text {
  /deep/ .ant-form-item-control-wrapper {
    flex: 1;
  }
  .ant-input[disabled] {
    background-color: transparent;
    border: none;
    color: #000;
    cursor: auto;
    overflow: hidden;
  }
}
.ant-form-item-editor {
  /deep/ .ant-form-explain {
    margin-top: 3px;
  }
}
.ant-form-item-action {
  /deep/ .ant-form-item-label {
    display: none;
  }
}
.field-box--horizontal {
  display: flex;
  justify-content: flex-start;
}
.field-box--bottom {
  align-items: flex-end;
}
.field-box--top {
  align-items: flex-start;
}
.field-box--center {
  align-items: center;
}
</style>
