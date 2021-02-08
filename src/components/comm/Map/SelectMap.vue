<!--
 * @Author: nxf
 * @Date: 2020-11-10 10:47:51
 * @LastEditors: cxf
 * @LastEditTime: 2020-11-26 20:06:14
 * @Description: 下拉选择地图
 * @FilePath: /media-source-bms/src/components/comm/Map/SelectMap.vue
-->
<template>
  <div class="map-input" @blur="isShowMap =false">
    <a-input-search
      class="input"
      v-model="address"
      placeholder="请输入地点，回车键搜索"
      allowClear
      @focus="showMap"
      @blur="isShowMap =false"
      @change="changeValue"
      @search="searchEvent"
    />
    <div id="container" class="mapBox" v-show="isShowMap"></div>
  </div>
</template>
<script>
export default {
  name: "SelectMap",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: "",
      required: false
    }
  },
  watch: {
    value(v) {
      this.address = v;
    }
  },
  data() {
    return {
      address: this.value || "",
      isShowMap: false
    };
  },
  mounted() {
    //this.initMap()
  },
  methods: {
    changeValue() {
      this.$emit("change", this.address);
    },
    initMap() {
      var vm = this;
      var map = new BMap.Map("container", { enableMapClick: false }); // 创建Map实例
      map.centerAndZoom("浙江", 11); // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);
      map.enableInertialDragging();
      map.enableContinuousZoom();
      if (this.address != "") {
        map.centerAndZoom(this.address, 11);
      }

      var geocoder = new BMap.Geocoder();
      map.addEventListener("click", function(e) {
        //给地图添加点击事件
        geocoder.getLocation(e.point, function(rs) {
          console.log(rs.address);
          vm.address = rs.address;
          vm.$emit("change", vm.address);
        });
      });
    },
    showMap() {
      this.isShowMap = true;
      this.initMap();
    },
    searchEvent() {
      var vm = this;
      var map = new BMap.Map("container", { enableMapClick: false });
      map.enableScrollWheelZoom(true);
      var local = new BMap.LocalSearch(map, {
        renderOptions: { map: map }
      });
      local.search(this.address);
      var geocoder = new BMap.Geocoder();
      map.addEventListener("click", function(e) {
        //给地图添加点击事件
        geocoder.getLocation(e.point, function(rs) {
          console.log(rs.address);
          vm.address = rs.address;
          vm.$emit("change", vm.address);
        });
      });
    },
    deleteEvent() {
      this.address = "";
    }
  }
};
</script>
<style lang="less" scoped>
.map-input {
  position: relative;
  .iconclose,
  .iconsearch {
    position: absolute;
    top: 12px;
    right: 5px;
    z-index: 99;
    cursor: pointer;
  }
  .mapBox {
    width: 100%;
    height: 200px;
    border: 1px solid #d2d6dc;
    position: absolute;
    top: 42px;
    left: 0;
    z-index: 99;
    background-color: #fff;
  }
}
</style>