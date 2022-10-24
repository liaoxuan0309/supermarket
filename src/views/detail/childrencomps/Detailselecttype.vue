<template>
  <div id="detailselecttype">
    <div class="head">
      <img :src="swiper[iscolorindex]" alt="">
      <span class="price">{{goods.oldPrice}}</span>
      <span class="close" @click="close()">×</span>
    </div>
    <div class="goodscolor">
      <span>颜色</span>
      <div class="goodsall ">
        <div class="goodscolor_item" v-for="(item,index) in swiper" :key="index" @click="active(index)">
        <img :src="item" class="color_image" :class="{active:index===iscolorindex}">
        </div>
      </div>
    </div>
    <div class="size">
      <span>尺码</span>
      <div class="size_all">
        <div v-for="(item,index) in size" :key="index" :class="{active:index===issizeindex}" class="size_item" @click="active_size(index)">
          {{item}}
        </div>
      </div>
    </div>
    <div class="buynum">
      <span>购买数量</span>
      <div class="buynum_right">
        <div class="block" @click="sub">-</div>
        <div class="block center">{{num}}</div>
        <div class="block" @click="add">+</div>
      </div>
    </div>
    <div class="isadd" @click="addtocar">
      <div class="sub">确&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;认</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Detailselecttype",
  props:{
    swiper:[],
    goods:{
      type:Object,
      default(){
        return {}
      }
    },
    iid:{
      type:String,
      default(){
        return ''
      }
    },
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      size:["S","M","L","XL","2XL"],
      num:1,
      iscolorindex:0,
      issizeindex:0,
      shopcar:{},
      shopinfo:{}
    }
  },
  methods: {
    close(){
      this.$emit('closetype')
    },
    add(){
      this.num++
    },
    sub(){
      if(this.num==1){
        return 
      }else{
        this.num--
      }
    },
    active(index){
      this.iscolorindex=index
    },
    active_size(index){
      this.issizeindex=index
    },
    //添加购物车
    addtocar(){
      this.shopinfo={}
      this.shopinfo.iid=this.iid
      this.shopinfo.image=this.swiper[this.iscolorindex]
      this.shopinfo.goodstitle=this.goods.title
      this.shopinfo.size=this.size[this.issizeindex]
      this.shopinfo.price = this.goods.nowPrice
      this.shopinfo.num=this.num

      this.shopcar.shopname=this.shop.name
      this.shopcar.data=[]
      this.shopcar.data.push(this.shopinfo)
      //调用actions的函数，里面的promise返回的值在then，进行一个操作
      this.$store.dispatch('addlist',this.shopcar).then(res=>{
        //tosat插件的使用
        this.$tosat.show(res)
      })
      //清除数据
      this.shopcar={}
    }
  },
}
</script>
<style scoped>
  #detailselecttype{
    height:50vh;
    width:100%;
    position:fixed;
    bottom: 30px;
    background-color: white;
    z-index: 100;
    font-size: 13px;
    box-shadow: 0 -5px 1px rgba(0,0,0,0.1);
  }
  .head{
    height:33%;
    background-color: white;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .goodscolor{
    height:22%;
    background-color: white;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .size{
    height:17%;
    background-color: white;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .buynum{
    height:13%;
    background-color: white;
    margin-bottom: 0px;
    border-bottom: 1px solid #eee;
  }
  .isadd{
    height:15%;
    background-color: var(--color-tint);
    margin-bottom: 0px;
  }
  .sub{
    height: 100%;
    width: 100%;
    line-height: 350%;
    text-align: center;
    color: white;
    font-size: 18px;
  }
  .buynum span{
    margin-left: 10px;
  }
  .buynum_right{
    float:right;
    height: 50%;
    width: 20%;
    display:flex;
    margin-right: 10px;
    margin-top: 20px;
  }
  .block{
    width: 100%;
    height: 100%;
    background-color: #eee;
    font-size: 15px;
    text-align: center;
    line-height: 200%;
  }
  .center{
    margin-left: 2px;
    margin-right: 2px;
  }
  .size span{
    margin-left: 10px;
  }
  .size_all{
    margin-top: 5px;
    display: flex;
    height: 100%;
  }
  .size_item{
    flex:1;
    height: 50%;
    line-height: 300%;
    text-align: center;
    background-color: #eee;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid white;
  }
  .active{
    border: 1px solid var(--color-tint);
    color: var(--color-tint);
  }
  
  .goodscolor span{
    margin-left:10px
  }
  .goodsall{
    display: flex;
    height: 90%;
  }
  .goodscolor_item{
    margin-top: 10px;
    margin-left: 10px;
    height: 100%;
    
  }
  .color_image{
    width: 45px;
    height: 70%;
    border-radius: 5px;
    
  }
 
  .head img{
    width: 22%;
    height: 85%;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
  }
  .price{
    color: var(--color-tint);
    margin-left:10px;
    margin-top:-90px;
    font-size: 25px;
  }
  .close{
    color: brown;
    font-size: 35px;
    position: absolute;
	  right: 10px;
  }
</style>