<template>
    <nvabar class="navbar">
      <div slot="left" class="left" @click="back()">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <div class="center_item" v-for="(item,index) in title" :class="{active_color:index===isactiveindex}" @click="coloractive(index)">{{item}}</div>
      </div>
      <div slot="right"></div>
    </nvabar>
</template>
<script>
  import Nvabar from 'components/common/nvabar/Nvabar'
export default {
  name:'Childnvabar',
  components:{
    Nvabar
  },
  data() {
    return {
      title:['商品','参数','评论','推荐'],
      isactiveindex:0,
    }
  },
  methods:{
    coloractive(index){
      this.isactiveindex=index
      this.$emit('titleclick',index)
    },
    //返回
    back(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .left{
    padding-top:6.5px;
  }
  .center{
    display: flex;
    font-size: 14px;
  }
  .center_item{
    flex:1;
  }
  .active_color{
     color: var(--color-tint);
  }
  .navbar{
    background-color:white;
  }
  .center_item:hover {
    color: var(--color-tint);
  }
</style>