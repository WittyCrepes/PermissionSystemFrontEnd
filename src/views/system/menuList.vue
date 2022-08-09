<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="用户管理" name="first">
      <UserInfo/>
    </el-tab-pane>
    <el-tab-pane label="用户组管理" name="second">
      <UserGroup/>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">
      <RoleManagement/>
    </el-tab-pane>
    <el-tab-pane label="接口管理" name="fourth">
      <Interface/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import UserInfo from './authorityComponent/UserInfo.vue'
import UserGroup from './authorityComponent/UserGroup.vue'
import RoleManagement from './authorityComponent/RoleManagement.vue'
import Interface  from './authorityComponent/Interface.vue'

const activeName = ref('first')

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }
 </script>
