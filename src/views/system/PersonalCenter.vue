<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <el-row style="margin: 5px">
        <el-col :span="12">用户名：</el-col>
        <el-col :span="12">{{ username }}</el-col>
      </el-row>
      <el-row style="margin: 5px">
        <el-col :span="12">电 话： </el-col>
        <el-col :span="12">{{ phone }}</el-col>
      </el-row>
      <el-row style="margin: 5px">
        <el-col :span="12">email：</el-col>
        <el-col :span="12">{{ email }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
const username = "admin";
const phone = "13214456789";
const email = "xxxx@163.com";
</script>

<style lang="scss" scoped></style>
