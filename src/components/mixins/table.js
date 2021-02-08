/*
 * @Description: 表格混入
 * @Author: cxf
 * @Date: 2020-11-12 19:07:58
 * @LastEditTime: 2021-02-09 02:10:55
 * @LastEditors: chenxiaofan
 * @FilePath: \jewelry-shop\admin\src\components\mixins\table.js
 */
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
        showTotal: total => `总共 ${total} 条`
      },
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectRowKeys = selectedRowKeys;
          this.selectRows = selectedRows;
          this.rowSelectionCb(selectedRowKeys, selectedRows);
        }
      }
    };
  },
  watch: {
    filters: {
      handler() {
        this.reload();
      },
      deep: true
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    getData() {},
    reload() {
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
    reloadTable() {
      this.$refs.table.getList();
      this.clearSelected();
    },
    /**
     * 分页切换
     * @param {Object} params
     */
    changePage(params) {
      this.pagination = params;
      this.filters.current = params.current;
      // this.getData();
    }
  }
};
