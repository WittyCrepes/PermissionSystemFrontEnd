<template>
  <el-row align="middle">
    <el-col :span="4" :push="3" >可关联数据</el-col>
    <el-col :span="16">
      <el-select v-model="value"  placeholder="请选择关联数据">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select></el-col>
    <el-col :span="1" :pull="3">
    <el-button type="primary" @click="saveAssocia">保存</el-button>
    </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="key" label="关联名称" width="180" />
    <el-table-column label="操作">
      <template #default="scope">
      <el-button type="danger" @click="deleteAssocia(scope.row.key)">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import {ref,reactive,onMounted} from 'vue';
import { queryAssoiation,deleteAssoiation,saveAssoiation } from '@/utils/api/system';
import { ElMessage } from "element-plus";

const props = defineProps({
  url: String,
  id:Number
})

const tableData = ref([])
const value = ref('')
onMounted(() => {
  url.value = props.url;
  id.value = props.id;
  search();
  searchSelect();
})

const url = ref();
const id = ref();
const search = ()=>{
  queryAssoiation(url.value,id.value).then(
    res=>{
      tableData.value = res.data.map((item:string)=>{
          return {key:item}
      })     
    }
  ).catch(err=>{ElMessage(err.message);
  })
}
const searchSelect = ()=>{
  queryAssoiation(url.value+"_available",id.value).then(
    res =>{
      options.value =  res.data.map((item:string)=>{
        return{
          value:item,
          label:item
        }
      })
      
    }
  ).catch(err=>{ElMessage(err.message);
  })
}

const deleteAssocia = (name:string)=>{
    deleteAssoiation(url.value,id.value,name).then(
      res=>{
        ElMessage({
          message: "移除成功！",
          type: "success",
        });
      search();
      searchSelect();
      }
    ).catch(
        err=>{
          ElMessage(err.message);
        }
      )
  
}
    
const options = ref([
  {
    value: '',
    label: '',
  }
])
const saveAssocia =()=>{
saveAssoiation(url.value,id.value,value.value).then(
  res=>{
    value.value = '';
    search();
    searchSelect();
    ElMessage({
          message: "关联成功！",
          type: "success",
        });
  }
).catch(
        err=>{
          ElMessage(err.message);
        }
      )
}
 </script>

<style lang="scss" scoped>

</style>