<template>
  <div class="nav_bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name:'Nvabar'
}
</script>
<style scoped>
  .nav_bar{
    display: flex;
    height: 45px;
   /*  垂直居中css */
    line-height: 44px;
    text-align: center;
    box-shadow: 0 2px 1px rgba(100,100,100,0.1);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;
    
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex:1;
    
  }
</style>