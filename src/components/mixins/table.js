/*
 * @Description: 表格混入
 * @Author: cxf
 * @Date: 2020-11-12 19:07:58
 * @LastEditTime: 2021-02-24 15:25:29
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/components/mixins/table.js
 */
import { formatTime } from "@/utils/utils";
export default {
  data() {
    return {
      data: [],
      columns: [],
      selectRowKeys: [],
      selectRows: [],
      filters: {},
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showTotal: (total) => `总共 ${total} 条`,
      },
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectRowKeys = selectedRowKeys;
          this.selectRows = selectedRows;
          this.rowSelectionCb(selectedRowKeys, selectedRows);
        },
      },
    };
  },
  watch: {
    filters: {
      handler() {
        this.reload();
      },
      deep: true,
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    getData() {},
    reload() {
      this.getData();
    },
    resetTable() {
      this.filters.current = 1;
      this.pagination.current = 1;
      this.getData();
    },
    /**
     * @description: 表格勾选回调
     * @param {*} selectedRowKeys
     * @param {*} selectedRows
     * @return {*}
     */
    /**
     * 设置数据总数
     */
    setTotal(num = 0) {
      this.pagination.total = num;
    },
    /**
     * @override
     * @description: 表格勾选回调(定义在组件内部)
     */
    rowSelectionCb() {},
    /**
     * @description: 勾选操作校验
     */
    isSelected(msg) {
      if (!this.selectRowKeys.length) {
        msg && this.$message.error(msg);
        return false;
      }
      return true;
    },
    /**
     * @description: 获取ids
     * @params {Object, Functon}
     */
    getIds(item) {
      if (item && item.id) {
        return [item.id];
      } else {
        return this.selectRowKeys;
      }
    },
    /**
     * @description: 清除勾选
     */
    clearSelected() {
      this.selectRows = [];
      this.selectRowKeys = [];
      this.rowSelectionCb(this.selectRowKeys, this.selectRows);
    },
    /**
     * 分页切换
     * @param {Object} params
     */
    changePage(params) {
      this.pagination = params;
      this.filters.current = params.current;
    },
    formatTime(value, format) {
      return formatTime(value, format);
    },
  },
};
