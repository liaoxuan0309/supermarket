<template>
  <div class="bottom-menu">
    <check-button class="select-all" ></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalprice}}</span>
    <span class="buy-product">去结算({{checklength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import {mapGetters} from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed:{
      ...mapGetters(['shopcarlist']),
      totalprice(){
        let all =0.00
        //对vuex里的数据进行遍历，对选中属性为true的数据进行汇总
        for(const index in this.shopcarlist){
         all+= 1.00*this.shopcarlist[index].data.filter(i=>{
            return i.checked
          }).reduce((prevalue,a)=>{
            return prevalue+ a.price*a.num
          },0).toFixed(2)
        }
        return all
      },
        //对vuex里的数据进行遍历，对选中属性为true的数据data的长度进行汇总
      checklength(){
        let all =0
        for(const index in this.shopcarlist){
         all+= this.shopcarlist[index].data.filter(i=>{
            return i.checked
          }).length
        }
        return all
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 11px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
