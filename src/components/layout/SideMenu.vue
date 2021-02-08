<!--
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:50:38
 * @LastEditTime: 2021-02-06 21:41:43
 * @LastEditors: chenxiaofan
 * @Description:
 * @FilePath: \jewelry-shop\admin\src\components\layout\SideMenu.vue
-->
<template>
  <a-menu theme="light" mode="inline" style="border: none; background: #2b2b2b;">
    <template v-for="item in menu">
      <a-sub-menu v-if="item.type == 0" :key="item.url" @click="clickMenu">
        <span slot="title" class="top-level-item">
          <i></i>
          {{ item.name }}
        </span>
        <template v-for="child in item.subMenus">
          <a-menu-item :key="child.url" v-if="child.type == 1">{{ child.name }}</a-menu-item>
        </template>
      </a-sub-menu>
      <!-- 没有子节点，直接输出 -->
      <a-menu-item v-if="item.type == 1" :key="item.url" @click="clickMenu" class="top-level-item">
        <i></i>
        {{ item.name }}
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      menu: [
        {
          name: '积分管理',
          type: 0,
          url: 'point',
          subMenus: [
            {
              name: '商品管理',
              type: 1,
              url: 'pointGoods'
            }
          ]
        }
      ]
    };
  },
  methods: {
    clickMenu(e) {
      this.$router.push({ name: e.key });
    }
  }
};
</script>

<style lang="less" scoped>
.top-level-item {
  font-weight: 600;
  i {
    display: inline-block;
    width: 3px;
    height: 10px;
    margin-right: 5px;
    background: #4786ff;
  }
}

.ant-menu-inline .ant-menu-item::after {
  display: none;
}
</style>
