/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 19:44:45
 * @LastEditTime: 2021-02-08 15:11:51
 * @LastEditors: cxf
 * @Description:
 * @FilePath: /jewelry-shop/admin/src/antd-vue.js
 */
import Vue from "vue";

import {
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Table,
  Pagination,
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  Button,
  ConfigProvider,
  FormModel,
  Form,
  DatePicker,
  Radio,
  Modal,
  message,
  Divider,
  Spin,
  Tooltip,
  Checkbox,
  Empty,
  Tabs,
  Popover,
  Statistic,
  Tree,
  Transfer,
  Carousel,
  Switch,
  Dropdown,
  Space,
  Collapse,
  Card,
  Tag,
  Cascader,
  AutoComplete,
  Progress,
  Upload,
} from "ant-design-vue";

Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(ConfigProvider);
Vue.use(FormModel);
Vue.use(Form);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(Modal);
Vue.use(Divider);
Vue.use(Spin);
Vue.use(Tooltip);
Vue.use(Checkbox);
Vue.use(Empty);
Vue.use(Tabs);
Vue.use(Popover);
Vue.use(Statistic);
Vue.use(Tree);
Vue.use(Transfer);
Vue.use(Carousel);
Vue.use(Switch);
Vue.use(Dropdown);
Vue.use(Space);
Vue.use(Collapse);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Cascader);
Vue.use(AutoComplete);
Vue.use(Progress);
Vue.use(Upload);

Vue.prototype.$message = message;
Vue.prototype.$modal = Modal;
