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
    <el-button type="primary" @click="outerVisible = true">新增</el-button>
  </div>
  <el-table border flexible stripe :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="120" />
    <el-table-column prop="menuName" label="接口(页面)名称" width="180" />
    <el-table-column prop="url" label="url" width="180" />
    <el-table-column prop="menuType" label="类型" width="180" />
    <el-table-column prop="description" label="描述" width="180" />
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
    title="接口（页面）信息"
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
      <el-form-item prop="menuName" label="接口(页面)名称">
        <el-input v-model="formData.menuName" />
      </el-form-item>
      <el-form-item prop="url" label="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item prop="menuType" label="类型">
        <el-radio-group v-model="formData.menuType" size="large">
          <el-radio label="页面" size="middle">页面</el-radio>
          <el-radio label="接口" size="middle">接口</el-radio>
        </el-radio-group>
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
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { queryInfo, saveInfo, updateInfo,deleteInfo } from "@/utils/api/system";
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
  menuName: "",
  url: "",
  menuType: "页面",
  description: "",
  remark: "",
});

//表单验证规则
const rules = reactive({
  menuName: {
    required: true,
    message: "请输入接口(页面)名称",
    trigger: "blur",
  },
  url: { required: true, message: "请输入接口(页面)url", trigger: "blur" },
  description: { required: true, message: "请输入描述信息", trigger: "blur" },
});
const outerVisible = ref(false);

onMounted(() => {
  search();
});

const search = () => {
  queryInfo("/api", currentPage.value, pageSize.value, keyword.value).then(
    (res) => {
      tableData.value = res.data.records;
      total.value = res.data.total;
    }
  ).catch((err) => {
      ElMessage(err.message);
    });
};

//编辑
const handleEdit = (row: any) => {
  outerVisible.value = true;
  formData.value = row;
};
const handleDelete = (id: number) => {
  
   deleteInfo("/api", id)
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
    saveInfo("/api", formData.value)
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
    updateInfo("/api", formData.value)
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
  menuName: "",
  url: "",
  menuType: "页面",
  description: "",
  remark: ""
};}
</script>

<style lang="scss" scoped>
.el-link {
  margin-right: 8px;
}
</style>
