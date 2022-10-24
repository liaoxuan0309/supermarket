<template >
  <div class="tabcontrol">
    <div v-for="(item,index) in titles" class="tabcontrol_item" :class="{active:activeindex==index}" @click="isactive(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'Tabcontrol',
  props:{
    titles:{
      type:Array,
      default:()=>{
        return ['潮流']
      }
    }
  },
  data() {
    return {
      activeindex:0
    }
  },
  methods: {
    isactive(index){
      this.activeindex=index
      //传出去index
      this.$emit('tabclick',index)
    }
  },
}
</script>
<style>
  .tabcontrol{
    height:50px;
    display:flex;
    text-align: center;
    line-height: 50px;
    /* color: var(--color-high-text); */
    font-size: 15px;
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
    box-shadow: 0 2px 1px rgba(100,100,100,0.1);
    margin-bottom: 5px;
  }
  .tabcontrol_item{
    flex: 1;
  }
  .active{
    color:var(--color-high-text) ;
    
  }  
  .active span{
    padding-bottom: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>