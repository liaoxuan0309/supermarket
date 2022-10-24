<template>
  <div id="tab-bar">
      <slot></slot>
  </div>
</template>
<script>
import Tabbaritem from './Tabbaritem'
export default {
  name:'Tabbar',
  components:{
    Tabbaritem
  }
}
</script>
<style>
  
</style>