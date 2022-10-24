<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.acm">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgload">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name:'Childrenswiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    },
   
  },
  data() {
    return {
      isload:true
    }
  },
  methods: {
    imgload(){
      if(this.isload){
        //加载完发射一次事件
        this.$emit('swiperimgload')
        //只发射一次
        this.isload=false
      }
    }
  },
}
</script>
<style>
  
</style>