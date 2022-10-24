<template>
  <div class="tabbar-item" @click="onactive()">
    <div v-if="isactive_class"><slot name="active_img"></slot></div>
    <div v-else><slot name="img"></slot></div>
    <div :style="isactive_style"><slot name="text"></slot></div>
  </div>
</template>
<script>
export default {
  name:'Tabbaritem',
  props:{
    path:String,
    fontcolor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      isactive:true
    }
  },
  methods: {
    onactive(){
      this.$router.push(this.path)
      /* console.log(this.$route.path) */
    }
  },
  computed:{
    isactive_class(){
      return this.$route.path.indexOf(this.path) !=-1
      
    },
    isactive_style(){
      return this.isactive_class ?{color:this.fontcolor} :{}
    }
  }
}
</script>
<style>
  
</style>