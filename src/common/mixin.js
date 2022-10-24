import { debounce } from 'common/utils'
import Backtop from 'components/common/backtop/Backtop'
import {POP, NEW, SELL} from "./const";


export { imageloadlistener,backtopmixin,tabControlMixin }

//是否监听image的加载事件
const imageloadlistener={
  data() {
    return {
      imageloadlistener:null
    }
  },
  mounted() {
    //生成的防抖函数
    const refresh = debounce(this.$refs.bs.refreshs, 200)
    //将imageloadlistener赋值为一个函数
    this.imageloadlistener = ()=>{refresh()}
    //填入监听事件后执行
     this.$bus.$on('img_loaded',this.imageloadlistener)
  },
  activated() {
    //活动时再把监听打开
    this.$bus.$on('img_loaded',this.imageloadlistener)
  },
  deactivated() {
    //不活动时停止监听事件总线img_loaded
    this.$bus.$off('img_loaded',this.imageloadlistener)
  },
}

//backtop的混入
const backtopmixin={
  components: {
    Backtop
  },
  data() {
    return {
      isshowbacktop:false
    }
  },
  methods: {
    isshow(opsition){
      /* console.log(opsition) */
      //判断是否返回顶部
        this.isshowbacktop= -opsition.y>1000
    },
    backtop(){
      //获取子组件Btscroll.vue中的scrollto方法，然后使用scrollto方法实现回到顶端
      this.$refs.bs.scrollto(0,0,500)
    },
  }
}

//tabcontrol的混入
const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    this.$refs.tabcontrol1.activeindex=index
    this.$refs.tabcontrol2.activeindex=index
    }
  }
}