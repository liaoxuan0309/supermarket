<template >
  <div class="shop">
    <check-button class="shopcheck" :checked="shopname.checked"  @click.native="itemcheck"/>
    <div class="shopname">
      店铺：{{shopname.shopname}}
    </div>
    <slot/>
  </div>
</template>
<script>
  import CheckButton from './CheckButton'
  import Childcaritem from './Childcaritem'
export default {
  name:'Childcarshop',
  components:{
    CheckButton,
    Childcaritem
  },
  props:{
    shopname:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    itemcheck(){
      this.shopname.checked = !this.shopname.checked
    }
  }
}
</script>
<style scoped>
  .shopcheck{
    margin-left:3%;
    padding-top: 3%;
  }
  .shopname{
    position: relative;
    top: -18px;
    left: 50px;
    color: var(--color-high-text);
  }
  .shop{
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 25px;
    margin: 5px 5px 5px 5px;
  }
</style>