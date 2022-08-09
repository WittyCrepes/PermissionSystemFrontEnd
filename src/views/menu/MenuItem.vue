<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <el-icon><component class="icons" :is="menu.meta.icon"/></el-icon>
        <span>{{menu.meta.title}}</span>
      </template>
      <MenuItem :menuList="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" style="color:#f4f4f5">
        <el-icon><component class="icons" :is="menu.meta.icon"/></el-icon>
       <template #title>
         <span>{{menu.meta.title}}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>

defineProps(['menuList']);
</script>

<style lang="scss" scoped>
.icons{
  width: 24px;
  height: 18px;
}
</style>
