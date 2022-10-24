<template>
  <div class="list">
  <btscroll class="content" ref="bs" :probetypenum="3">
    <childcarshop v-for="(shopitem,a) in shopcarlist" :key="a" :shopname="shopitem" >
      <childcaritem v-for="(item,index) in shopcarlist[a].data" :key="index" :shopinfo="item" />
    </childcarshop>
  </btscroll>
</div>
</template>
<script>
import Btscroll from 'components/common/btscroll/Btscroll'
import Childcarshop from './Childcarshop'
import Childcaritem from './Childcaritem'


export default {
  name:'Childcarlist',
  components:{
    Btscroll,
    Childcarshop,
    Childcaritem
  },
  props:{
    shopcarlist:{
      type:Array,
      default(){
        return []
      }
    },
    
  },
  data() {
    return {
      shopname:[]
    }
  },
  activated() {
    //刷新
   this.$refs.bs.refreshs()
  }
}
</script>
<style scoped>
  .content{
    height: calc(100% - 151px);
    margin-top: 50px;
     overflow: hidden;
  }
  .list{
    height: 100vh;
    overflow: hidden;

  }
</style>