export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  checkLength(state) {
    return state.cartList.filter(item => item.checked).length
  }
}
