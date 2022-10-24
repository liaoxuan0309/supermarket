//导入vue组件
import Tosat from './Tosat'
const obj = {}
//Vue.use(obj) 会自动执行install方法
obj.install = function (Vue) {
  //1.创建组件构造器
  const contrustor = Vue.extend(Tosat)
  //2.new 的方式，根据组件构造器，创建一个组件对象
  const tosat = new contrustor()
  //3.将组件对象，手动挂载到某一个元素上
  tosat.$mount(document.createElement('div'))
  //4.tosat.$el对应的是上面的div，然后将他挂载到body上
  document.body.appendChild(tosat.$el)
  //5.添加事件原型
  Vue.prototype.$tosat = tosat
}
export default obj