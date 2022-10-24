<template>
  <div id="detail">
    
    <childnvabar @titleclick="titleclick" ref="nva" />

    <btscroll @scroll="gety" class="content" ref="bs" :probetypenum="3">
      <childswiper  :swiperimg="swiper" @detailimg_load="refresh"></childswiper>
      <childbaseinfo :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info  :detail-info="detailinfo" @goodsimg="refresh_goods"/>
      <detail-param-info ref="param" :param-info="paraminfo" />
      <detail-comment-info ref="comment" :comment-info="commentinfo" />
      <goods ref="goods" :goodlist="recommends" />
      
    </btscroll>
    <detailselecttype 
      :swiper="swiper"
      :goods="goods"
      :iid="iid"
      :shop="shop"
      v-show="isshowselect"
      @closetype="addtocar" />
    <backtop @click.native="backtop()" v-show="isshowbacktop" />
    <detail-bottom-bar @addtocar="addtocar" />
  </div>
</template>
<script>
  import Childnvabar from './childrencomps/Childnvabar'
  import Childswiper from './childrencomps/Childswiper'
  import Childbaseinfo from './childrencomps/Childbaseinfo'
  import DetailShopInfo from './childrencomps/DetailShopInfo'
  import DetailGoodsInfo from './childrencomps/DetailGoodsInfo'
  import DetailParamInfo from './childrencomps/DetailParamInfo'
  import DetailCommentInfo from './childrencomps/DetailCommentInfo'
  import DetailBottomBar from './childrencomps/DetailBottomBar'
  import Detailselecttype from './childrencomps/Detailselecttype'

  import Btscroll from 'components/common/btscroll/Btscroll'

  import Goods from 'components/content/goods/Goods'

  import {getdetail,goods,Shop,GoodsParam,getrecommend} from 'network/detail'

import {imageloadlistener,backtopmixin} from 'common/mixin'

export default {
  name:'Detail',
  data() {
    return {
      //商品id
      iid:null,
      //请求的结果的数据
      result:{},
      swiper:[],
      goods:{},
      //商家信息
      shop:{},
      detailinfo:{},
      paraminfo:{},
      commentinfo:{},
      recommends:[],
      nvabary:[],
      opsitionindex:0,
      //是否显示加入购物车详情页面
      isshowselect:false,
    }
  },
  components:{
    Childnvabar,
    Childswiper,
    Childbaseinfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Detailselecttype,

    Goods,

    Btscroll
  },
  
  //混入封装
  mixins:[imageloadlistener,backtopmixin],
  created() {
    this.iid=this.$route.params.iid
    getdetail(this.iid).then(res=>{
      const data= res.result
      this.result =data
      //拿到轮播图的图片
      this.swiper=data.itemInfo.topImages
      //拿到商品数据
      this.goods = new goods(data.itemInfo,data.columns,data.shopInfo.services)
      //商家数据
      this.shop =new Shop(data.shopInfo)
      //商品详情数据
      this.detailinfo=data.detailInfo
      //商品参数信息
      this.paraminfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //评论数据
      if(data.rate.cRate!==0){
        this.commentinfo =data.rate.list[0]
      }
      
    }).catch()
    //推荐数据
    getrecommend().then(res=>{
      this.recommends =res.data.list
    })
  },
  methods: {
    //刷新scroll
    refresh(){
      //轮播图和商品详情图片加载完后执行刷新（执行两次）
      this.$refs.bs.refreshs()
    },
    refresh_goods(){
      //对四个标题的offsettop的值进行一次的push（执行一次）
      this.nvabary.push(0)
      this.nvabary.push(this.$refs.param.$el.offsetTop-50)
      this.nvabary.push(this.$refs.comment.$el.offsetTop-50)
      this.nvabary.push(this.$refs.goods.$el.offsetTop-50)
      this.nvabary.push(Number.MAX_VALUE)
      
      //刷新
      this.refresh()
    },
    //顶部点击后传出来的index，利用index判断是那个位置然后滚动
    titleclick(index){
      this.$refs.bs.scrollto(0,-this.nvabary[index],500)
    },
    //监听滚动事件,记录滚动的y值
    gety(opsition){
      //mixin里面的方法
      this.isshow(opsition)
      //检查滚动的距离，判断顶部bar的选择
      let y =-opsition.y
      let length = this.nvabary.length
      let nvabary =this.nvabary
      for(let i=0;i<length-1;i++){
        if(this.opsitionindex!=i&&(i<length-1&&y>=nvabary[i]&&y<nvabary[i+1])){
          this.opsitionindex =i;
          this.$refs.nva.isactiveindex=this.opsitionindex
        }
      }
    },
    addtocar(){
      this.isshowselect=!this.isshowselect
    }
  }
}
</script>
<style scoped>
#detail{
    position: relative;
    z-index: 11;
    height:100vh;
    background-color: #fff;
  }
  .content{
    position:absolute;
    overflow: hidden;
    top: 0px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
</style>