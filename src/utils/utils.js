/*
 * @Description:
 * @Author: cxf
 * @Date: 2021-02-09 11:27:16
 * @LastEditTime: 2021-02-19 11:40:56
 * @LastEditors: cxf
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/utils/utils.js
 */
import moment from "moment";
export const formatTime = (time, format = "YYYY-MM-DD HH:mm:ss") => {
  var date = new Date(time);
  return time ? moment(date).format(format) : "-";
};

// 乘法
export function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (error) {
    m = 0;
  }
  try {
    m += s2.split(".")[1].length;
  } catch (error) {
    m = 0;
  }
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 10 ** m;
}
