import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: "/recommend"
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
    this.shopUrl = shopInfo.shopUrl
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.infokey = info.key;
    this.rulekey = rule.key;
    this.ruledis = rule.disclaimer;
    this.sizes = rule.tables[0];
    if(rule.tables.length >1)
      for(let i=1;i<rule.tables.length;i++)
        for(let j=0;j<rule.tables[0].length;j++)
          for(let k=1;k<rule.tables[i][j].length;k++)
          this.sizes[j].push(rule.tables[i][j][k])
  }
}

export class ShareInfo {
  constructor(shopInfo,itemInfo) {
    this.logo = shopInfo.shopLogo
    this.shopname = shopInfo.name
    this.goodsImages = itemInfo.topImages
    this.discount = itemInfo.discountDesc
    this.title = itemInfo.title
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
  }

}
