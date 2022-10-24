<template lang="">
  <div id="car">
    <nvabar class="nvabar">
      <div  slot="center">购物车({{carlength}})</div>
    </nvabar>
    <childcarlist :shopcarlist="shopcarlist" />
    <bottom-bar/>
  </div>
</template>
<script>
  import nvabar from 'components/common/nvabar/Nvabar'

  import Childcarlist from './childcomps/Childcarlist'
  import BottomBar from './childcomps/BottomBar'


  //vuex的辅助函数mapgetters将getters属性映射到computed中
  import {mapGetters} from 'vuex'


export default {
  name:'Cart',
  components:{
    nvabar,
    Childcarlist,
    BottomBar
  },
  computed:{
    //结构
    //对象写法
    /* ...mapGetters({
      length:'carlength',
      car: 'shopcarlist'
    }) */
    //数组写法
    ...mapGetters([
      'carlength',
      'shopcarlist'
    ]),
    shopcarlist(){
      return this.$store.state.shopcarlist
    }
  },
  watch:{
    shopcarlist:{
      handler(shopcarlist){
      },
      deep:true,
      immediate:true
    }
  }
}
</script>
<style scoped>
  .nvabar{
    background-color:var(--color-tint);
    color: white;
  }
  
</style>