
import { request_goods } from './request'

export { getdetail,goods,Shop,GoodsParam,getrecommend}

//根据iid请求商品的详细数据
function getdetail(iid) {
  return request_goods({
    url: '/detail',
    params: {
      iid
    }
  })
}
//推荐商品数据请求
function getrecommend() {
  return request_goods({
    url: '/recommend'
  })
}
//商品信息类
class goods{
  constructor(itemInfo, columns, services){
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}
//商家信息类
class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//商品参数类
class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}