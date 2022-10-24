<template>
  <div id="app">
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <maintabbar/>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
/* import HelloWorld from './components/HelloWorld.vue' */
import maintabbar from './components/content/tabbar/Maintabbar'
//我的页面的小图标
import Icon from 'components/content/Icon/Icon.vue'
import SvgIcon from 'components/content/Icon/svg.vue'
export default {
  name: 'App',
  components: {
    maintabbar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
@import url('./assets/css/base.css');

</style>
