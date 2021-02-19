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
        :row-selection="rowSelection"
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
    <editModal ref="editModal" @success="reload" />
  </div>
</template>

<script>
import tableMixins from "@/components/mixins/table";
import editModal from "./modal/edit";
export default {
  mixins: [tableMixins],
  components: {
    editModal
  },
  data() {
    return {
      api: this.$api.system.user,
      filters: {
        pageSize: 10,
        current: 1,
        keyword: ""
      },
      data: [],
      columns: [
        {
          title: "用户名",
          dataIndex: "username"
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          customRender: value => this.formatTime(value)
        },
        {
          title: "修改时间",
          dataIndex: "updatedAt",
          customRender: value => this.formatTime(value)
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          scopedSlots: { customRender: "action" },
          operations: [
            // {
            //   text: "编辑",
            //   clickEvent: this.handleEdit
            // },
            {
              text: "删除",
              clickEvent: this.handleDelete
            }
          ]
        }
      ],
      toolbar: [
        {
          fieldType: "btn",
          label: "添加",
          on: this.handleAdd
        },
        {
          key: "delete",
          fieldType: "btn",
          label: "删除",
          on: this.handleDelete,
          disabled: true
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
      this.$refs.editModal.open();
    },
    handleEdit(record) {
      this.$refs.editModal.open(null, record);
    },
    handleDelete(item) {
      this.$modal.confirm({
        title: "删除",
        content: "确认删除？",
        onOk: () => {
          this.api.delete(this.getIds(item)).then(() => {
            this.$message.success("删除成功");
            this.reload();
          });
        }
      });
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
