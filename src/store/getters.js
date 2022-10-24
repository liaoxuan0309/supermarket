export default {
  carlength(state) {
    let length =0
    for (let item of state.shopcarlist){
      length+=item.data.length
    }
    return length
  },
  shopcarlist(state) {
    return state.shopcarlist
  }
}