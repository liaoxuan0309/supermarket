import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import modules from "./modules";

Vue.use(Vuex)

const state ={
  shopcarlist: [],
  }

const store = new Vuex.Store({
  state,
  //不要做复杂的操作
  mutations,
  //异步操作和复杂操作在这里实现
  actions,
  getters,
  modules
})

export default store 