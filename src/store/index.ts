import { de } from 'element-plus/es/locale';
import { createStore } from 'vuex'
import {ITab} from './protoType/tab'

export interface State{
  collapse:boolean,
  tabsList:Array<ITab>
}

export default createStore({
  state: {
    collapse:false,
    tabsList:[]
  },
  mutations: {
    //设置collapse
    setCollapse:(state:State,collapse:boolean)=>{
      state.collapse = collapse;
    },
    addTab:(state:State,tab:ITab)=>{
      //登录时初始化
      if(state.tabsList.some===undefined){
        state.tabsList = []
        state.tabsList.push(tab)
      }
      //判断tab是否已经存在
      if(state.tabsList.some(item => item.path === tab.path)) return;
      state.tabsList.push(tab)
    }
  },
  getters:{
    getCollapse:(state:State)=>{
      return state.collapse;
    },
    getTabs:(state:State)=>{
      return state.tabsList;
    }
  },
  actions: {
  },
  modules: {
  }
})
