/*
 * @Author: jiang chuyun
 * @Date: 2020-08-25 15:51:44
 * @LastEditTime: 2021-02-23 02:51:43
 * @LastEditors: chenxiaofan
 * @Description:
 * @FilePath: \jewelry-shop\admin\src\utils\api.js
 */
import fetch from './fetch';

export default {
  login: fetch.post('user/login'),
  logout: fetch.post('user/logout'),
  point: {
    goods: {
      list: fetch.get('point/goods/list'),
      detail: fetch.get('point/goods/detail'),
      edit: data => (data.id ? fetch.post('point/goods/update')(data) : fetch.post('point/goods/add')(data)),
      delete: fetch.post('point/goods/delete')
    }
  },
  tenant: {
    list: fetch.get('tenant/list'),
    edit: data => (data.id ? fetch.post('tenant/update')(data) : fetch.post('tenant/add')(data)),
    delete: fetch.post('tenant/delete')
  },
  system: {
    user: {
      list: fetch.get('system/user/list'),
      detail: fetch.get('system/user/detail'),
      edit: data => (data.id ? fetch.post('system/user/update')(data) : fetch.post('system/user/add')(data)),
      delete: fetch.post('system/user/delete')
    }
  },
  media: {
    getUploadToken: fetch.get('media/uploadToken'),
    upload: (url, data) => fetch.form(url)(data),
    getDetail: fetch.get('media/detail')
  },
  registerUser: {
    list: fetch.get('registerUser/list'),
    edit: data => (data.id ? fetch.post('registerUser/update')(data) : fetch.post('registerUser/add')(data))
  }
};
