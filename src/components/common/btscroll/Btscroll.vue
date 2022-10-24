<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  
export default {
  name:'Btscroll',
  props:{
    probetypenum:{
        default(){
          return 1
        },
        type:Number
      },
      upload:{
        type:Boolean,
        default(){
          return true
        }
      }
  },
  data(){
    return{
      scroll:null,
    }
  },
  //挂载完
  mounted() {
    //初始化
    let dom =this.$refs.wrapper
    //创建实例
    this.scroll= new Bscroll(dom,{
      //配置
      //是否监听除按钮以外的元素的点击事件
     click:true,
     //是否监控滑动的配置
     probeType:this.probetypenum,
     //是否监听下拉
     pullUpLoad:this.upload
    })

    //监听滑动
    this.scroll.on('scroll',(opsition)=>{
      this.$emit('scroll',opsition)
    })
    //监听下拉到最底下后发射事件
    this.scroll.on('pullingUp',(opsition)=>{
      /* this.$emit('scroll',opsition) */
      this.$emit('upload')
    })
    
    
  },
  methods: {
    //回到顶部(时间尽量不要设置为0)
    scrollto(x,y,time=500){
      //判断是否存在scroll
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    //重置上拉刷新的事件触发
    finishupload(){
      this.scroll && this.scroll.finishPullUp()
    },
    //图片每次加载完来处理的刷新
    refreshs(){
      this.scroll && this.scroll.refresh()
    }
  },
}
</script>
<style scoped>
  
</style>