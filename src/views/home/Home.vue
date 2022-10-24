<template>
  <div id="home" >
    <nvabar class="nav_color">
      <!-- <div slot="left">1</div> -->
      <div  slot="center">购物街</div>
     <!--  <div slot="right">2</div> -->
    </nvabar>
    <tabcontrol ref="tabcontrol2" :titles="['流行','新款','精选']" @tabclick="getindex" v-show="isshowcontrolswiper2"/>
    
    <btscroll class="content" ref="bs" :probetypenum="3" :upload="true" @scroll="gety" @upload="upload">
      <childrenswiper @swiperimgload="swiperimgload" :banners="banner"/>
      <recommand :recommend="recommend"/>
      <childrenfeature/>
      <tabcontrol ref="tabcontrol1" :titles="['流行','新款','精选']" @tabclick="getindex"/>
      <goods :goodlist="active_control" />
    </btscroll>
    <!-- 给组件绑定不是发射出来的事件必须加上.native -->
    <backtop @click.native="backtop()" v-show="isshowbacktop" />
  </div>
</template>
<script>
import nvabar from 'components/common/nvabar/Nvabar'
import Btscroll from 'components/common/btscroll/Btscroll'

import Tabcontrol from 'components/content/tabcontrol/Tabcontrol'
import Goods from 'components/content/goods/Goods'

import Childrenswiper from './childrenponents/Childrenswiper'
import Recommand from './childrenponents/Recommand'
import Childrenfeature from './childrenponents/Childrenfeature'

import {gethomedata,getcontroldata,getgoods} from 'network/home'
//引入功能js，里面是防抖函数
import {debounce} from 'common/utils'
import {imageloadlistener,backtopmixin} from 'common/mixin'
export default {
  name:'Home',
  components: {
   nvabar,
   Btscroll,

   Tabcontrol,
   Goods,

   Childrenswiper,
   Recommand,
   Childrenfeature,
  },
  data() {
    return {
      banner:[],
      recommend:[],
      controldata:{
        'pop':{'page':1,data:[]},
        'new':{'page':1,data:[]},
        'sell':{'page':1,data:[]}
      },
      activetype:{
        index:0,
        type:'pop'
      },
      swiper2offsetup:0,
      isshowcontrolswiper2:false,
      scrolly:0,
    }
  },
  created() {
    //请求页面第二行的数据
    this.gethomedata()
    //进入系统的第一页数据
    this.getcontroldata('pop')
    this.getcontroldata('sell')
    this.getcontroldata('new')
   
  },
  //挂载好后执行
  mounted() {
    /* //生成的防抖函数
    const refresh= debounce(this.$refs.bs.refreshs,200)
    this.imageloadlistener = ()=>{refresh()}
    //填入监听事件后执行
     this.$bus.$on('img_loaded',this.imageloadlistener) */
  },
  //重新活动
  activated() {
    //重新活动时把scroll下拉到对应的高度
    this.$refs.bs.scrollto(0,this.scrolly,100)
    //刷新一下scroll
    this.$refs.bs.refreshs()
  },
  //不活动时
  deactivated() {
    //不活动时记录scroll下拉的高度
    this.scrolly = this.$refs.bs.scroll.y
    //不活动时停止监听事件总线img_loaded
    /* this.$bus.$off('img_loaded',this.imageloadlistener) */
  },
  computed:{
    active_control(){
      const type= this.activetype.type
      return this.controldata[type].data
    }
  },
  //混入
  mixins:[imageloadlistener,backtopmixin],
  methods: {
    swiperimgload(){
      //记录wiper加载图片完后的offsettop的高度
      this.swiper2offsetup=this.$refs.tabcontrol1.$el.offsetTop
    },
    //获取三类里面的下标
    getindex(index){
      this.activetype.index=index
      if(index==0){
      this.activetype.type='pop'
    }else if(index==1){
       this.activetype.type='new'
    }else if(index==2){
       this.activetype.type='sell'
    }
    //统一这个两个组件的所选的index
    this.$refs.tabcontrol1.activeindex=index
    this.$refs.tabcontrol2.activeindex=index
    },
    //获取下拉的y值
    gety(opsition){
      /* console.log(opsition) */
      //判断是否返回顶部
        /* this.isshowbacktop= -opsition.y>800 */
        this.isshow(opsition)
        //判断是否到了高度,到了显示另外一个tabcontrol2
        this.isshowcontrolswiper2=-opsition.y>this.swiper2offsetup
        
    },
    //回到顶部按钮点击后回到顶部的方法
    /* backtop(){
      //获取子组件Btscroll.vue中的scrollto方法，然后使用scrollto方法实现回到顶端
      this.$refs.bs.scrollto(0,0,500)
    }, */

    //请求banner的数据
    gethomedata(){
      gethomedata().then(
      res=>{
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list
      }
     )
    },
    //请求goods的数据
    getcontroldata(type){
      //另外一个接口
      /* getcontroldata().then(
      res=>{
        for(var i = 0; i < res.length; i++){
          if(res[i].typeid==3){
            this.controldata.prop.push(res[i]);
          }else if(res[i].typeid==10){
            this.controldata.new.push(res[i]);
          }else if(res[i].typeid==1){
            this.controldata.sell.push(res[i]);
          }
        }
      }
     ) */
     let page = this.controldata[type].page
     getgoods(type,page).then(
      res=>{
        this.controldata[type].data.push(...res.data.list)
      }
    )
    this.controldata[type].page ++
    },
    //下拉加载更多
    upload(){
      //加载更多数据
      this.getcontroldata(this.activetype.type)
      //调用ref:bs的方法（刷新使其可以重新下拉）
      this.$refs.bs.finishupload()
    }
  },
}
</script>
<style scoped>
  .nav_color{
    background-color:var(--color-tint);
    color: white;
  }
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  /*
  scroll必须设置高度
  */
  /* .content{
    height: calc(100% - 58px);
    overflow: hidden;
  } */
  .content{
    position:absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>