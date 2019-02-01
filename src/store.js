import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//多组件所共有的公共存储空间
export default new Vuex.Store({
  //公共数据读取方法：this.$store.state.adminName/globalSettings
  state: {          //当前数据的状态。类似于组件对象的data属性
    adminName:'',  //当前登录的管理员名
    globalSettings:{//项目的全局设置信息
      // apiUrl:'http://127.0.0.1:8090',//初始默认值
      apiUrl:'http://xfnsapi.applinzi.com',

    }
  },
  //公共数据修改方法：this.$store.commit('setAdminName','boss')/this.$store.commit('setGlobalSettings',{})
  mutations: {      //控制数据的进化（修改state），类似于组件对象的methods，用mutation修改数据可以保证数据的响                      应式
    setAdminName(state,value){
      state.adminName=value;
    },
    setGlobalSettings(state,value){
      state.globalSettings=value;
    }
  },
  actions: {

  }
})
