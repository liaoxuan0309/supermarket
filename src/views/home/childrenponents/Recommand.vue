<template>
  <div class="home_recommand">
    <div v-for="item in recommend" class="recommand_items">
     <a :href="item.link">
      <div><img :src="item.image" alt=""></div>
      <div class="recommand_info">{{item.title}}</div>
     </a>
    </div>
  </div>
</template>
<script>
export default {
  name:'Recommand',
  props:{
    recommend:{
      type:Array,
      default:function(){
        return []
      }
    }
  }
}
</script>
<style scoped>
  .home_recommand {
    display:flex;
    text-align:center;
    box-shadow: 0 10px 1px rgba(100,100,100,0.1);
    
  }
  .recommand_items{
    flex:1;
  }
  .home_recommand img{
    height:75px;
    width:75px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .recommand_info{
    font-size:15px;
    margin-bottom: 10px;
  }
</style>