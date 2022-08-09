<template>
<el-icon @click="changeIcon" class="icon">
  <component  :is="status?Expand:Fold"></component>
  </el-icon>
</template>

<script lang="ts" setup>
import {ref,computed} from 'vue'
import {Fold,Expand} from '@element-plus/icons-vue'
import { useStore } from 'vuex';

const store = useStore()
const status = computed(()=>{
  return store.getters['getCollapse']
})
//图标切换
const changeIcon = ()=>{
  store.commit('setCollapse',!status.value)
}
 </script>

<style lang="scss" scoped>
.icon{
  font-size: 24px;
  color:#303133;
  cursor: pointer;
  margin-right: 15px;
}
</style>