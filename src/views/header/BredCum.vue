<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in tabs">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import {ref,watch,Ref} from 'vue'
import {ArrowRight} from '@element-plus/icons-vue'
import { useRoute,RouteLocationMatched } from 'vue-router';
//定义面包屑数据
const tabs:Ref<RouteLocationMatched[]> = ref([])
const route = useRoute();
const getBredCum = ()=>{
  //获取所有有meta和title的数据
  let mached = route.matched.filter(item=>item.meta && item.meta.title);
  //判断第一个是不是首页，如果不是，构造一个
  //console.log(mached)
  const first = mached[0];
  if(first.path !== '/home'){
    mached = [{path:'/home',meta:{title:'首页'}} as any].concat(mached);
  }
  //面包屑数据填充
  tabs.value = mached;
}
//默认加载
getBredCum();
//watch，参数1为返回监听对象函数，参数2为执行函数
watch(()=>route.path,()=>getBredCum());
 </script>

<style lang="scss" scoped>

</style>