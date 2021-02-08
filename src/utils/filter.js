/*
 * @Description:
 * @Author: cxf
 * @Date: 2021-01-21 10:42:48
 * @LastEditTime: 2021-02-01 11:47:18
 * @LastEditors: cxf
 * @FilePath: /score-ms/src/utils/filter.js
 */
import Vue from "vue";
Vue.filter("empty", function(value, unit = "") {
  if (value !== "") {
    return value + unit;
  }
  return value;
});
Vue.filter("replaceHtml", (v = "") => {
  return v.replace(/<[^<>]+>/g, "");
});
