<template>
 <el-tabs
    v-model="activeTab"
    type="card"
    closable
    class="demo-tabs"
    @edit="handleTabsEdit"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="item in tabs"
      :key="item.path"
      :label="item.title"
      :name="item.path"
      
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {ref,computed,watch,onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ITab } from '@/store/protoType/tab';

//获取标签数据
const store = useStore();
const tabs = computed(()=>{
  return store.getters['getTabs'];
})

//获取活动标签数据
const route = useRoute();
const router = useRouter();
//选项卡列表
const tabsList = computed(()=>{
  return store.getters['getTabs']
})
//当前活动选项卡
const activeTab = ref('');

const setActiveTab = ()=>{
  activeTab.value = route.path;
}



const handleTabsEdit = (targetName:string,action: 'remove' | 'add')=>{
  if(action === 'add'){
      const {path,meta} = route;
      const tab:ITab = {
        path:path,
        title:meta.title as string
      }
      
      store.commit('addTab',tab)
  }
else if (action === 'remove') {
    if(targetName==='/home') return;
    const tabs = tabsList.value
    let activeName = activeTab.value
    if (activeName === targetName) {
      tabs.forEach((tab:ITab, index:number) => {
        if (tab.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.path
          }
        }
      })
    }
    //重新设置当前选项卡
    activeTab.value = activeName
    
    //重新设置选项卡数据
    store.state.tabsList = tabs.filter((tab:ITab) => tab.path !== targetName)
    //跳转路由
    router.push({path:activeName})
  }
}

//点击选项卡
const clickTab = (tab:any)=>{
  const {props} = tab;
  //跳转路由
  router.push({path:props.name})
  
}

//监听路由变化
watch(()=>route.path,()=>{
  //退出登录时清除选项卡
  if(route.path=='/login'){
    store.state.tabsList = '';
    return;
  }
  //设置激活的选项卡
  setActiveTab();
  //把当前路由添加到选项卡数据
  handleTabsEdit(route.path as string,"add");
  
})

//刷新后选项卡不会丢失
onMounted(()=>{
  //解决刷新数据丢失问题
  beforeRefresh();
  //设置激活的选项卡
  setActiveTab();
  //把当前路由添加到选项卡数据
  handleTabsEdit(route.path as string,"add");
})

//解决刷新数据丢失问题
const beforeRefresh = ()=>{
  window.addEventListener('beforeunload',()=>{
    sessionStorage.setItem('tabsView',JSON.stringify(tabsList.value))
  })
  let tabSession = sessionStorage.getItem('tabsView');
  if(tabSession){
    let oldTabs = JSON.parse(tabSession);
    if(oldTabs.length > 0){
      store.state.tabsList = oldTabs;
    }
  }
}
 </script>

<style lang="scss" scoped>

</style>