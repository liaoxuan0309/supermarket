<template>
  <div class="goods" @click="detail()">
    <a>
    <img :src="showimage" alt="" @load="img_loaded">
    <div class="goods-info">
      <p>{{gooditem.title}}</p>
      <!-- <span>id:{{gooditem.typeid}}</span> -->
      <span class="price">¥{{gooditem.price}}</span>
      <span class="collect">{{gooditem.cfav}}</span>
    </div>
    </a>
  </div>
</template>
<script>

export default {
  name:'Goodsitem',
  props:{
    gooditem:{
      type:Object,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      id:''
    }
  },
  created() {
    this.id=this.goodsid()
  },
  computed:{
    showimage:function(){
      return this.gooditem.image || this.gooditem.show.img
    },
  },
  methods:{
    img_loaded(){
      //图片加载产生的一个可滚动区域的问题
      //总体思路：事件总线，将每一个item的image加载完成后产生的事件发射一个事件出去，最终给到scroll组件使其进行一个自己刷新，从而保持一直计算出对的scrollheighter。解决只能很少长度滚动的bug
      //作为复用组件时，如何解决发射的事件都是同一个，所有组件都会监听到这个事件（影响性能）
      //1.通过路由检查当前的path，是home发出home的事件总线，是detail发出detail的事件总线（不同的事件总线）
      /* if(this.$route.path.indexOf('/home')>-1){
        this.$bus.$emit('img_loaded_home')
      }else if(this.$route.path.indexOf('/detail')>-1){
        this.$bus.$emit('img_loaded_detail')
      } */
      //2.组件不活动时或者销毁时，关闭对这个总线的监听（同一个事件总线）
      this.$bus.$emit('img_loaded')
    },
    //跳转
    detail(){
      this.$router.push('/detail/'+this.id)
    },
    goodsid(){
      return this.gooditem.item_id || this.gooditem.iid
    }
  }
}
</script>
<style scoped>
  .goods {
    padding-bottom: 40px;
    position: relative;
    width:45%;
    
  }
  .goods img {
    width: 100%;
    height: 96%;
    border-radius: 3px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>