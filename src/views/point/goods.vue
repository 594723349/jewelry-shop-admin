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

    <editGoods ref="editGoods" @success="reload" />
  </div>
</template>

<script>
import tableMixins from '@/components/mixins/table';
import editGoods from './modal/editGoods';
export default {
  mixins: [tableMixins],
  components: {
    editGoods
  },
  data() {
    return {
      filters: {
        pageSize: 10,
        current: 1,
        keyword: ''
      },
      data: [],
      columns: [
        {
          title: '商品名称',
          dataIndex: 'name'
        },
        {
          title: '描述',
          dataIndex: 'desc'
        },
        {
          title: '积分',
          dataIndex: 'point'
        },
        {
          title: '图片',
          dataIndex: 'src',
          scopedSlots: { customRender: 'src' },
          width: 100
        },
        {
          title: '操作',
          align: 'center',
          width: 200,
          scopedSlots: { customRender: 'action' },
          operations: [
            {
              text: '编辑',
              clickEvent: this.handleEdit
            },
            {
              text: '删除',
              clickEvent: this.handleDelete
            }
          ]
        }
      ],
      toolbar: [
        {
          fieldType: 'btn',
          label: '添加',
          on: this.handleAdd
        },
        {
          key: 'delete',
          fieldType: 'btn',
          label: '删除',
          on: this.handleDelete,
          disabled: true
        },
        {
          fieldType: 'search',
          prop: 'keyword',
          align: 'right'
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.commit('setLoading', true);
      this.$api.point.goods.list(this.filters).then(data => {
        this.setTotal(data.count);
        this.data = data.rows;
        this.$store.commit('setLoading', false);
      });
    },
    handleAdd() {
      this.$refs.editGoods.open();
    },
    handleEdit(record) {
      console.log(record);
      this.$refs.editGoods.open(null, record);
    },
    handleDelete(item) {
      this.$modal.confirm({
        title: '删除',
        content: '确认删除？',
        onOk: () => {
          this.$api.point.goods.delete(this.getIds(item)).then(() => {
            this.$message.success('删除成功');
            this.reload();
          });
        }
      });
    },
    rowSelectionCb(selectedRowKeys, selectedRows) {
      this.$refs.toolbar.disabled(['delete'], !selectedRows.length);
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
