<template>
    <el-container class="layout">
      <el-aside width="200px" class="aside">
        <Aside/>
        </el-aside>
      <el-container>
        <el-header class="header">
          <Header/>
        </el-header>
        <el-main class="main">
          <div>
          <Tabs />
          </div>
          
          <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from '@/views/header/Header.vue'
import Aside from '@/views/menu/Aside.vue'
import { useStore } from 'vuex';
import Tabs from './header/tabs/Tabs.vue';
/*import { watch} from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
//const anyTab = ref(false);
const store = useStore();
const anyTab = ()=>{
 const tabList =  store.getters['getTabs'];
 console.log(tabList.length);
 
  if(tabList.length===0) return false;

  return true;
  
}

const showTabs = anyTab();
watch(()=>route.path,showTabs=>{
  return anyTab()
})*/
 </script>

 <style lang="scss" scoped>
.layout{
  height: 100%;
  .aside{
    background-color: rgb(48,65,86);
    width: auto;
    
  }
  .header{
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    align-items: center;
    // background-color: blueviolet;
  }

  .main{
    // background-color: darkgrey;
    padding-top: 0px;
  }
}
 </style>