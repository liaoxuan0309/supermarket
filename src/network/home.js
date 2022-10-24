import { request,request_blogry,request_goods } from './request'

export { gethomedata, getcontroldata, getgoods }
//轮播图数据
  function gethomedata() {
  return request({
    url:'/home/multidata'
  })
}
//一开始用的随便找的接口
function getcontroldata() {
  return request_blogry({
    url:'/test/index'
  })
}
//对商品类型进行一个请求
//具体商品数据
function getgoods(type,page) {
  return request_goods({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}