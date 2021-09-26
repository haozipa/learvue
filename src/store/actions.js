import * as types from "./mutation-type";

export default {
  addToCart(context,product) {
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(v => v.iid == product.iid)
      if(oldProduct){
        context.commit(types.ADD_CART_COUNT,oldProduct)
        resolve('已添加购物车，添加成功')
      }else {
        product.count = 1
        product.checked = true
        context.commit(types.ADD_CART_GOOD,product)
        resolve('添加购物车成功')
      }
    })
  }
}
