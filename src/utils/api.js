/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:51:44
 * @LastEditTime: 2021-02-18 16:00:07
 * @LastEditors: cxf
 * @Description:
 * @FilePath: /jewelry-shop/jewelry-shop-admin/src/utils/api.js
 */
import fetch from "./fetch";

export default {
  login: fetch.post("user/login"),
  point: {
    goods: {
      list: fetch.get("point/goods/list"),
      detail: fetch.get("point/goods/detail"),
      edit: (data) =>
        data.id ? fetch.post("point/goods/update")(data) : fetch.post("point/goods/add")(data),
      delete: fetch.post("point/goods/delete"),
    },
  },
  media: {
    getUploadToken: fetch.get("media/uploadToken"),
    upload: (url, data) => fetch.form(url)(data),
    getDetail: fetch.get("media/detail"),
  },
};
