import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail/',
    params : {
      iid
    }
  })
}

export class GoodsBaseInfo{
  constructor(itemInfo,columns,shopInfo){
    //商品介绍标题
    this.title = itemInfo.title ? itemInfo.title : ''
    //新价格
    this.nowPrice = itemInfo.lowNowPrice ? itemInfo.lowNowPrice : ''
    //旧价格
    this.oldPrice = itemInfo.oldPrice ? itemInfo.oldPrice : ''
    //价格描述
    this.discount = itemInfo.discountDesc ? itemInfo.discountDesc : ''
    //销量
    this.sales = columns[0] ? columns[0] : 0
    //收藏
    this.collect = columns[1] ? columns[1] : 0
    //快递种类
    this.express = columns[2] ? columns[2] : ''
    //商家提供的服务
    this.services = shopInfo.services ? shopInfo.services : []
  }
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
