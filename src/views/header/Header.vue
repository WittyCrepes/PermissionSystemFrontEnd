<template>
<div class="head">
<el-row align="middle">
  <el-col :span="1">
  <Collapse/>
  </el-col>
  <el-col :span="22">
  <BredCum/>
  </el-col>
  <el-col :span="1">
  <el-dropdown>
  <el-avatar>admin</el-avatar>
  <template #dropdown>
      <el-dropdown-menu>
        </el-dropdown-menu>
        <el-dropdown-item @click="toPersonalCenter">个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </template>
  </el-dropdown>
  </el-col>
</el-row>
</div>
</template>

<script setup lang="ts">
import BredCum from './BredCum.vue';
import Collapse from './Collapse.vue';
import {setJwtToken,getTokenUser} from "@/utils/common-utils"
import { useRouter } from 'vue-router';
const router = useRouter();
const toPersonalCenter = ()=>{
    router.push({name:"PersonalCenter"})
}
const logout = ()=>{
  router.replace({name:"Login"});
  sessionStorage.clear();
}
 </script>

<style lang="scss" scoped>
.head{
  margin-top: 5px;
}
</style>