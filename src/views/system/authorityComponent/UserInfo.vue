<template>
  <div style="margin: 10px 0; display: flex">
    <el-input
      v-model="keyword"
      placeholder="请输入关键字"
      clearable
      style="width: 20%"
    ></el-input>
    <el-button type="primary" style="margin-left: 5px" @click="search"
      >查询</el-button
    >
    <el-button type="primary" @click="outerVisible = true;">新增</el-button>
  </div>
  <el-table border flexible stripe :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="120" />
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="groupId" label="用户组id" width="180" />
    <el-table-column prop="enabled" label="是否启用" width="120">
      <template #default="scope">
        <el-icon v-if="scope.row.enabled" color="green"
          ><SuccessFilled
        /></el-icon>
        <el-icon v-else color="red"><CircleCloseFilled /></el-icon>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="创建日期" width="180" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column fixed="right" align="center" label="操作" width="100">
      <template #default="scope">
        <div>
          <el-link
            type="primary"
            :underline="false"
            @click="handleDelete(scope.row.id)"
            >删除</el-link
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 20]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="search"
    @current-change="search"
  />
  <el-dialog
    v-model="outerVisible"
    title="用户信息"
    destroy-on-close="true"
    @close="resetForm"
  >
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      :model="formData"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item prop="username" label="用户名">
        <el-input v-model="formData.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" show-password v-model="formData.password" />
      </el-form-item>
      <el-form-item prop="groupId" label="用户组id">
        <el-input v-model="formData.groupId" />
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-switch
          v-model="formData.enabled"
          inline-prompt
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="outerVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import {
  queryInfo,
  saveInfo,
  updateInfo,
  deleteInfo,
} from "@/utils/api/system";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const currentPage = ref(1);
const pageSize = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const total = ref(0);
const keyword = ref("");
const tableData = ref([]);
const formData = ref({
  id: null,
  username: "",
  password:"",
  groupId: '',
  createDate: "",
  enabled: true,
  remark: "",
});

//表单验证规则
const rules = reactive({
  username: {
    required: true,
    message: "请输入用户名",
    trigger: "blur",
  },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  groupId: { required: true, message: "请输入用户组ID", trigger: "blur"}
            
});
const outerVisible = ref(false);

onMounted(() => {
  search();
});

const search = () => {
  queryInfo("/user", currentPage.value, pageSize.value, keyword.value).then(
    res => {
      tableData.value = res.data.records;
      total.value = res.data.total;
    }
  ).catch(err=>{
    ElMessage(err.message);
  });
};


const handleDelete = (id: number) => {
  deleteInfo("/user", id)
    .then((res) => {
      ElMessage({
        message: "数据删除成功！",
        type: "success",
      });
      outerVisible.value = false;
      search();
    })
    .catch((err) => {
      ElMessage(err.message);
    });
};

const onSubmit = () => {
  if (formData.value.id == null) {
    saveInfo("/user", formData.value)
      .then((res) => {
        ElMessage({
          message: "数据插入成功！",
          type: "success",
        });
        outerVisible.value = false;
        search();
      })
      .catch((err) => {
        ElMessage(err.message);
      });
  } else {
    updateInfo("/user", formData.value)
      .then((res) => {
        ElMessage({
          message: "数据更新成功！",
          type: "success",
        });
        outerVisible.value = false;
        search();
      })
      .catch((err) => {
        ElMessage(err.message);
      });
  }
};
const resetForm = () => {
  formData.value = {
  id: null,
  username: "",
  password:"",
  groupId: '',
  createDate: "",
  enabled: true,
  remark: "",
  }
  
};
</script>

<style lang="scss" scoped>
.el-link {
  margin-right: 8px;
}
</style>
