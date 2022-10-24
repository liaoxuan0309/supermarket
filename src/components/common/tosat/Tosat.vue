<template>
  <div class="toast" v-show="isshow">
    <div>{{massage}}</div>
  </div>
</template>
<script>
export default {
  name:'Tosat',
  data() {
    return {
      massage:'',
      isshow:false
    }
  },
  methods: {
    show(massage="默认信息",time=2000){
      this.isshow=true
      this.massage=massage
      setTimeout(() => {
        this.isshow=false
        this.massage =""
      }, time);
    }
  },
}
</script>
<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px ;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0,0.7);
    border-radius: 10px;
    color: white;
    z-index: 100;
  }
</style>