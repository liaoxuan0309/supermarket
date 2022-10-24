<template>
  <div>
      <tabbar>
        <tabbaritem path="/home">
          <img src="~assets/img/tabbar/home.svg" slot="img" alt="">
          <img src="~assets/img/tabbar/home_active.svg" slot="active_img" alt="">
          <div slot="text">首页</div>
        </tabbaritem>
        <tabbaritem path="/category">
          <img src="~assets/img/tabbar/category_active.svg" slot="active_img" alt="">
          <img src="~assets/img/tabbar/category.svg" slot="img" alt="">
          <div slot="text">分类</div>
        </tabbaritem>
        <tabbaritem path="/cart">
          <img src="~assets/img/tabbar/cart_active.svg" slot="active_img" alt="">
          <img src="~assets/img/tabbar/cart.svg" slot="img" alt="">
          <div slot="text">购物车</div>
        </tabbaritem>
        <tabbaritem path="/profile" fontcolor="orange">
          <img src="~assets/img/tabbar/profile_active.svg" slot="active_img" alt="">
          <img src="~assets/img/tabbar/profile.svg" slot="img" alt="">
          <div slot="text">我的</div>
        </tabbaritem>
      </tabbar>  
  </div>
</template>
<script>
import Tabbar from 'components/common/tabbar/Tabbar'
import Tabbaritem from 'components/common/tabbar/Tabbaritem'

export default {
  name:'Maintabbar',
  components:{
    Tabbar,
    Tabbaritem
  }
}

/* new Promise((resolve,reject)=>{
  setTimeout(() => {
    //成功的话
    resolve('hello world')
    //失败
    reject('失败')
  }, 1000);
  //then是resolve的处理，catch是reject的处理
}).then(data=>{
  console.log(data)
  return new Promise()
}).catch(err=>{
  console.log(err)
}) */
</script>
<style>
  #tab-bar{
  display: flex;
  background-color: #f6f6f6;
  /* 脱离标准文档流 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100,100,100,0.1);
}
.tabbar-item{
  margin-top: 5px;
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 13px;
}
.tabbar-item img{
  width:25px;
  height:25px;
}
</style>