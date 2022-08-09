<template>
  <div style="margin: 10px 0; display: flex">
    <el-input
      v-model="keyword"
      placeholder="请输入关键字"
      clearable
      style="width: 20%"
    ></el-input>
    <el-button type="primary" style="margin-left: 5px" @click="search"
      >查询</el-button>
    <el-button type="primary" @click="outerVisible = true">新增</el-button>
  </div>
  <el-table border flexible stripe :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="120" />
    <el-table-column prop="roleName" label="角色名称" width="180" />
    <el-table-column prop="roleCode" label="角色代码" width="180" />
    <el-table-column prop="description" label="描述" width="180" />
    <el-table-column label="关联接口" width="100"  >
        <template #default="scope">
        <el-button type="danger" plain @click="showAssocia(scope.row.id)">编辑</el-button>
        </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" />
    <el-table-column fixed="right" align="center" label="操作" width="100">
      <template #default="scope">
        <div>
          <el-link
            type="primary"
            :underline="false"
            @click="handleEdit(scope.row)"
            >编辑</el-link
          >
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
    title="角色信息"
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
      <el-form-item prop="roleName" label="角色名称">
        <el-input v-model="formData.roleName" />
      </el-form-item>
      <el-form-item prop="roleCode" label="角色代码">
        <el-input v-model="formData.roleCode" />
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input v-model="formData.description" />
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
  <el-dialog     
  v-model="showForm"
  title="关联页面(接口)"
  destroy-on-close="true">
  <Associations url="/role_menu" :id="currentId" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { queryInfo, saveInfo, updateInfo,deleteInfo } from "@/utils/api/system";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import Associations from "../template/AssociationTemplate.vue"

const ruleFormRef = ref<FormInstance>();

const currentPage = ref(1);
const pageSize = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const total = ref(0);
const keyword = ref("");
const showForm = ref(false);
const outerVisible = ref(false);
const currentId = ref(1);

const showAssocia = (id:number)=>{
  showForm.value = true;
  currentId.value = id;
}

const tableData = ref([]);
const formData = ref({
  id: null,
  roleName: "",
  roleCode: "",
  description: "",
  remark: "",
});

//表单验证规则
const rules = reactive({
  roleName: {
    required: true,
    message: "请输入角色名称",
    trigger: "blur",
  },
  roleCode: { required: true, message: "请输入角色", trigger: "blur" },
  description: { required: true, message: "请输入描述信息", trigger: "blur" },
});


onMounted(() => {
  search();
});

const search = () => {
  queryInfo("/role", currentPage.value, pageSize.value, keyword.value).then(
    (res) => {
      tableData.value = res.data.records;
      total.value = res.data.total;
    }
  ) .catch((err) => {
      ElMessage(err.message);
    });
};

//编辑
const handleEdit = (row: any) => {
  outerVisible.value = true;
  formData.value = row;
};
const handleDelete = (id: number) => {
  
   deleteInfo("/role", id)
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
    saveInfo("/role", formData.value)
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
    updateInfo("/role", formData.value)
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
  roleName: "",
  roleCode: "",
  description: "",
  remark: "",
};}
</script>

<style lang="scss" scoped>
.el-link {
  margin-right: 8px;
}
</style>
