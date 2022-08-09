<template>
<MenuLogo v-if="!isCollapse" />

  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    background-color="#304156"
    router
  > 
<MenuItem :menuList="menuList"></MenuItem>
  </el-menu>

</template>

<script lang="ts" setup>
//setup语法糖，import后可直接使用，无需在compoment注册
import { computed,ref,reactive} from 'vue'
import MenuItem from '@/views/menu/MenuItem.vue'
import MenuLogo from '@/views/menu/MenuLogo.vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeIndex = computed(()=>{
  const {path} = route;
  return path;
})

const store = useStore();
const isCollapse = computed(()=>{
  return store.getters['getCollapse']
})
//const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


let menuList = reactive([
  {
    path: "/home",
    component: "Home",
    meta: {
      title: "首页",
      icon: "HomeFilled",
      roles: ["sys:manage"]
    },
    children: []
  },
  {
    path: "/system",
    component: "Layout",
    alwaysShow: true,
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Menu",
      roles: ["sys:manage"],
      parentId: 0
    },
    children: [
      {
        path: "/department",
        component: "/system/department/department",
        alwaysShow: false,
        name: "department",
        meta: {
          title: "机构管理",
          icon: "SetUp",
          roles: ["sys:dept"],
          parentId: 17
        }
      },
      {
        path: "/userList",
        component: "/system/User/UserList",
        alwaysShow: false,
        name: "userList",
        meta: {
          title: "用户管理",
          icon: "ZoomOut",
          roles: ["sys:user"],
          parentId: 17
        }
      },
      {
        path: "/metadataList",
        component: "/system/metadataList",
        alwaysShow: false,
        name: "metadataList",
        meta: {
          title: "元数据管理",
          icon: "UserFilled",
          roles: ["sys:role"],
          parentId: 17
        }
      },
      {
        path: "/menuList",
        component: "/system/Menu/MenuList",
        alwaysShow: false,
        name: "menuList",
        meta: {
          title: "权限管理",
          icon: "Setting",
          roles: ["sys:menu"],
          parentId: 17
        }
      }
    ]
  },
  {
    path: "/attachments",
    component: "Layout",
    alwaysShow: true,
    name: "attachments",
    meta: {
      title: "附件管理",
      icon: "Grid",
      roles: ["sys:goods"],
      parentId: 0
    },
    children: [
      {
        path: "/attachmentCategory",
        component: "/attachments/attachmentCategory",
        alwaysShow: false,
        name: "attachmentCategory",
        meta: {
          title: "附件分类",
          icon: "TrendCharts",
          roles: ["sys:goodsCategory"],
          parentId: 34
        }
      }
    ]
  }
  
])


</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  border-right: none;
}
:deep(.el-sub-menu .el-sub-menu__title){
  color: #f4f4f5 !important;
}
:deep(.el-menu .el-menu-item){
  color: #bfcbd9;
}
:deep(.el-menu-item.is-active){
  color: #409eff !important;
}
:deep(.is-opened .el-menu-item){
  background-color: #1f2d3d !important;
}
:deep(.el-menu-item:hover){
  background-color: #001528 !important;
}
</style>