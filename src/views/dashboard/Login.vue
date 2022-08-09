<template>
  <div class="login">
    <el-form class="login-form">
      <el-alert :title="loginForm.errorMsg" type="error" v-show="loginForm.errorVisible">
      </el-alert>
      <el-form-item >
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
        </el-input>
      </el-form-item> 
      <el-form-item style="width:100%;">
        <el-button type="primary" @click="userpwdLogin" style="width:100%;">登 录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {ref,reactive} from 'vue'
import {login} from '@/utils/api/system'
import { setJwtToken } from '@/utils/common-utils';
import { useRouter } from 'vue-router';
const router = useRouter();

const  loginForm = reactive( {
        username: "",
        password: "",
        errorMsg:"",
        errorVisible: false
      })

const userpwdLogin =()=>{
  login(loginForm.username,loginForm.password)
  .then(res=>{
    setJwtToken(res.data);
    console.log(res);
    router.push({name:"Home"})
  }).catch(err=>{
    console.log(err);
    loginForm.errorMsg = err.message;
    loginForm.errorVisible = true;
    
  })
}
 </script>


<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/bg.jpg");
  background-size: cover;
}
.login-form { 
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  margin-right: 20px;


}
</style>