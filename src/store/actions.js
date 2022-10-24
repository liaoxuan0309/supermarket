import { ADD_NUM,ADD_PRODUCT} from './mutations-types'
export default {
  addlist(context, payload) {
    /* let product = null
    for (let item of context.state.shopcarlist) {
      if (item.data.size == payload.data.size && item.data.iid == payload.data.iid&&item.data.image==payload.data.image) {
        product = item
      }
    }
    //判断product是否存在值
    if (product) {
      //由于mutations方法只允许传两个参数一个state还有一个另外一个值，所以将这两个对象合成为一个对象传值过去：a
        let a = {}
        a.product = product
        a.payload = payload
        this.commit(ADD_NUM,a)
      } else {
        this.commit(ADD_PRODUCT,payload)
      } */
    
    return new Promise((resolve,reject) => {
      let shopname = null
   function check(){ for (let item of context.state.shopcarlist){
      if (payload.shopname == item.shopname) {
        shopname = item
        /* console.log('1')
        console.log(shopname) */
      }
    }
    } 
    check()
    if (shopname) {
      /* console.log(shopname.data.length) */
      for (let item of context.state.shopcarlist){
        for (let data of item.data){
          if (data.size == payload.data[0].size && data.iid == payload.data[0].iid && data.image == payload.data[0].image) {
            //数量相加
              /* shopname.data[i].num += payload.data[0].num */
              let a = {}
              a.num1 = data
              a.num2 = payload.data[0]
            this.commit('add', a)
            resolve('添加购物车成功')
              /* console.log('2') */
            } else {
              //店铺内商品的数组增加
              /* shopname.data.push(payload.data[0]) */
               let b = {}
              b.shopname = shopname.data
              b.data = payload.data[0]
              this.commit('add_data', b)
            /* console.log('3') */
            resolve('添加购物车成功')
              return
            }
        }
      }
         
    } else {
      /* console.log('4') */
      //添加一个新的店铺
      this.commit(ADD_PRODUCT, payload)
      resolve('添加购物车成功')
    }
    })
  }
}