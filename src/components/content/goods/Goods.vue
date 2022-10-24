<template>
  <div class="goodslist">
    <goodsitem v-for="(item,index) in goodlist" :key="index" :gooditem="item"/>
  </div>
</template>
<script>
import Goodsitem from './Goodsitem'
export default {
  name:'Goods',
  components:{
    Goodsitem
  },
  props:{
    goodlist:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .goodslist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
  }
</style>