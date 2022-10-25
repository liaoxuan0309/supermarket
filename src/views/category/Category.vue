<template>
  <div id="category">
    <nvabar class="nav-bar"><div slot="center">商品分类</div></nvabar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <tabcontrol ref="tabcontrol2" :titles="['综合', '新品', '销量']"
                       @tabclick="tabClick"
                       class="tabcontrol2"
                       v-show="istabcontrol2show"></tabcontrol>
      <btscroll id="tab-content" :data="[categoryData]" ref="bs" :probetypenum="3" :upload="true" @scroll="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @isload="isload"></tab-content-category>
          <tabcontrol ref="tabcontrol1" :titles="['综合', '新品', '销量']"
                       @tabclick="tabClick"></tabcontrol>
         
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </btscroll>
    <backtop @click.native="backtop(tabcontrol1offsettop)" v-show="isshowbacktop" />
    </div>
  </div>
</template>

<script>
  import Nvabar from 'components/common/nvabar/Nvabar'
  import Btscroll from 'components/common/btscroll/Btscroll'
  import Tabcontrol from 'components/content/tabcontrol/Tabcontrol'

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  
  import {debounce} from 'common/utils'
  import {POP, SELL, NEW} from "common/const";
  import {tabControlMixin,backtopmixin} from "common/mixin";
  
  export default {
		name: "Category",
    components: {
		  Nvabar,
      Btscroll,
      TabMenu,
      Tabcontrol,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin,backtopmixin],
    data() {
		  return {
		    categories: [],
        categoryData: {
        },
        currentIndex: -1,
        istabcontrol2show:false,
        tabcontrol1offsettop:null,
      }
    },
    created() {
		  // 1.请求分类数据
      this._getCategory()
    },
    computed: {
		  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      },
      scroll(opsition){
        this.isshow(opsition)
        //判断是否展示第二个tabcontrol2
        this.istabcontrol2show= this.tabcontrol1offsettop>opsition.y
      },
      isload(){
        //刷新betterscroll
        this.$refs.bs.refreshs()
        //对图片加载完立即就记录数值可能会造成记录的数值偏大，在最后一张图片加载完后过0.2秒再保存值
        setTimeout(() => {
          this.tabcontrol1offsettop=this.$refs.tabcontrol1.$el.offsetTop *-1
        }, 200);
      }
    },
    mounted() {
      this.$bus.$on('isload',()=>{
        this.$refs.bs.refreshs()
      })
    }
	}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
  .tabcontrol2{
    position:fixed;
    top: 44px;
    left: 100px;
    width: 314px;
  }
</style>
