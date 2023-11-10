<template>
  <div class="common-layout">
    <el-container>
      <el-header><h1>请登录</h1></el-header>
      <el-main>
        <el-form
            ref="ruleFormRef"
            status-icon
            label-width="120px"
            class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="username"/>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="password" type="password"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login(password)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from 'vuex'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
export default {
  data() {
    return {
      password: '',
      username: ''
    }
  },
  methods: {
    showPassword() {
      console.log(this.password);
    }
  },
  setup() {
    const login = async (username,password) => {
      try {
        const loginClick = `http://localhost:8080/user/login`;
        const data = new FormData();
        data.append('password', password);
        data.append('username', username);
        const resp = await axios({
          method: 'POST',
          url: loginClick,
          data: data,
        });
        // console.log(resp.data.msg);
        if(resp.data.msg=='登录成功'){
          self.location='/';
        }else{
          ElMessage.error('登录失败');
        }
      } catch (error) {
        console.log(error);
      }
    }
    return {
      login
    }
  }
}
</script>