<template>
  <div class="page-wrapper">
    <c-toolbar ref="toolbar" :columns="toolbar" :props="filters"></c-toolbar>
    <div class="table-box">
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        :scroll="{ x: '1500px'}"
        @change="changePage"
      >
        <template #src="value">
          <c-img-group :data="value"></c-img-group>
        </template>
        <div slot="action" slot-scope="text, record, index, column">
          <table-btns :data="column.operations" :record="record" :index="index"></table-btns>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import tableMixins from "@/components/mixins/table";
export default {
  mixins: [tableMixins],
  data() {
    return {
      api: this.$api.order,
      filters: {
        pageSize: 10,
        current: 1,
        keyword: ""
      },
      data: [],
      columns: [
        {
          title: "订单id",
          dataIndex: "orderId",
          width: 150
        },
        {
          title: "商品名",
          dataIndex: "goodsName",
          ellipsis: true,
          width: 200
        },
        {
          title: "商品类别",
          dataIndex: "goodsClassify"
        },
        {
          title: "真实姓名",
          dataIndex: "truename"
        },
        {
          title: "手机号",
          dataIndex: "phone",
          width: 120
        },
        {
          title: "原价",
          dataIndex: "price"
        },
        {
          title: "折扣价",
          dataIndex: "discountedPrice"
        },
        {
          title: "积分",
          dataIndex: "point"
        },
        {
          title: "订单创建时间",
          width: 180,
          dataIndex: "orderDate",
          customRender: value => this.formatTime(value)
        },
        {
          title: "订单导入时间",
          dataIndex: "createdAt",
          width: 180,
          customRender: value => this.formatTime(value)
        }
        // {
        //   title: "操作",
        //   align: "center",
        //   scopedSlots: { customRender: "action" },
        //   fixed: "right",
        //   operations: [
        //     {
        //       text: "编辑",
        //       clickEvent: this.handleEdit
        //     },
        //     {
        //       text: "删除",
        //       clickEvent: this.handleDelete
        //     }
        //   ]
        // }
      ],
      toolbar: [
        // {
        //   fieldType: "btn",
        //   label: "添加",
        //   on: this.handleAdd
        // },
        // {
        //   key: "delete",
        //   fieldType: "btn",
        //   label: "删除",
        //   on: this.handleDelete,
        //   disabled: true
        // },
        {
          fieldType: "upload",
          label: "导入",
          customRequest: this.handleImport,
          accept: ".xls,.xlsx",
          callback: this.handleImportEnd
        },
        {
          fieldType: "search",
          prop: "keyword",
          align: "right"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.commit("setLoading", true);
      this.api.list(this.filters).then(data => {
        this.setTotal(data.count);
        this.data = data.rows;
        this.$store.commit("setLoading", false);
      });
    },
    handleAdd() {
      this.$router.push({
        name: "editPointGoods",
        params: { id: 0 }
      });
    },
    handleEdit(record) {
      this.$router.push({
        name: "editPointGoods",
        params: { id: record.id }
      });
    },
    handleImport(data, loading, ref) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", data.file);
        this.api
          .imports(formData)
          .then(res => {
            resolve();
          })
          .catch(err => {
            reject(err.msg);
          });
      });
    },
    handleImportEnd(result) {
      if (result.status === "success") {
        this.$message.success("导入完成");
        this.resetTable();
      } else {
        this.$modal.error({
          title: "导入失败",
          content: result.result
        });
      }
    },
    rowSelectionCb(selectedRowKeys, selectedRows) {
      this.$refs.toolbar.disabled(["delete"], !selectedRows.length);
    }
  }
};
</script>

<style lang="less" scoped>
.table-box {
  height: calc(100% - 80px);
  overflow-y: auto;
}
</style>
