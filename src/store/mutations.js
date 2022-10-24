import { ADD_NUM,ADD_PRODUCT} from './mutations-types'
export default {
  [ADD_NUM](state,payload) {
    payload.product.num+=payload.payload.num
  },
  [ADD_PRODUCT](state, payload) {
    
    payload.checked = true
    payload.data[0].checked =true
    state.shopcarlist.push(payload)
  },
  add(state, payload) {
    /* console.log(payload) */
    payload.num1.num += payload.num2.num
    /* console.log(payload)
    console.log('执行完毕') */
  },
  add_data(state, payload) {
    payload.data.checked=true
    payload.shopname.push(payload.data)
  }
}