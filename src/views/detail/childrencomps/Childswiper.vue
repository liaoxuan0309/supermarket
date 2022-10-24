<template>
  <div>
    <swiper class="swiper_detail">
      <swiper-item v-for="(item,index) in swiperimg" :key="index">
        <a href="">
          <img :src="item" alt="" @load="detailimg_load" >
        </a>
      </swiper-item>
      </swiper>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name:'Childswiper',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    swiperimg:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    detailimg_load(){
      if(this.isload){
      this.$emit('detailimg_load')
      this.isload=false
    }
    }
  },
  data() {
    return {
      isload:true
    }
  },
  
}
</script>
<style scoped>
  .swiper_detail{
    padding-top:47px;
    height: 450px;
    overflow: hidden;
  }
  
</style>