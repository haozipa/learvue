import * as types from "./mutation-type";

export default {
  [types.ADD_CART_COUNT](state,oldProduct) {
    (state.cartList.find(v => v.iid == oldProduct.iid)).count++
  },
  [types.ADD_CART_GOOD] (state,product) {
    state.cartList.push(product)
  }
}
