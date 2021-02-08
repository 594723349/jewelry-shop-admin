/*
 * @Description:
 * @Author: cxf
 * @Date: 2020-01-21 17:58:42
 * @LastEditTime: 2021-02-01 11:49:54
 * @LastEditors: cxf
 * @FilePath: /score-ms/src/components/comm/form/util.js
 */
/**
 * 将全局常量值转成符合下拉或复选的数据模型
 */
export function formatOptions(data) {
  let arr = [];
  if (data) {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        arr.push({
          label: item,
          value: index,
        });
      });
    } else {
      for (let k in data) {
        arr.push({
          label: data[k],
          value: k,
        });
      }
    }
  }
  return arr;
}
/**
 * 获取时间转换格式
 */
export function getDateFormat(formItem) {
  if (formItem.format) return formItem.format;
  if (formItem.showTime) {
    return "YYYY-MM-DD HH:mm:ss";
  } else {
    return "YYYY-MM-DD";
  }
}
/**
 * @description: 日期添加时分妙
 */
export function addTime(date, index) {
  if (index === 0 || index === "start") {
    date.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
  } else {
    date.set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 59,
    });
  }
  return date;
}
/**
 * 转换时间戳
 * @param {Moment} moment moment对象
 * @param {String} format
 * @param {String,Number} addTimeType 0 | start: 添加00:00:00、1 | end: 添加59:59:59
 */
export function formatDate(moment, format, addTimeType) {
  if (!format) format = "YYYY-MM-DD";
  if (addTimeType !== undefined) {
    moment = addTime(moment, addTimeType);
  }
  if (format === "valueOf") {
    return moment.valueOf();
  }
  return moment.format(format);
}
/**
 * 递归获取所有prop
 */
export function getPoprs(items) {
  const props = [];
  recursion(items);
  function recursion(items) {
    items.forEach((item) => {
      if (Array.isArray(item)) {
        recursion(item);
      } else {
        item.prop && props.push(item.prop);
      }
    });
  }
  return props;
}
/**
 * @description: 是否是json
 */
export function isJSON(obj) {
  const isjson =
    typeof obj == "object" &&
    Object.prototype.toString.call(obj).toLowerCase() == "[object object]" &&
    !obj.length;
  return isjson;
}
/**
 * @description: 格式化输入内容
 * @param {string} type 值类型 number：数字
 * @param {any} value 值
 */
export function formatInputValue(type, value) {
  if (type === "number") {
    // 只能输入数字
    return value.replace(/[^\d]/g, "");
  }
  return value;
}
