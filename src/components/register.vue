<template>
<h1>注册</h1>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
  >
    <el-form-item label="用户名" prop="user_name">
      <el-input v-model="ruleForm.user_name" />
    </el-form-item>
    <el-form-item label="密码" prop="user_password">
      <el-input v-model="ruleForm.user_password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <el-input v-model="ruleForm.confirm_password" @blur="validateInput('confirm_password')" />
      <!--        <el-message v-if="validationErrors.good_price" type="error">{{ validationErrors.good_price }}</el-message>-->
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="ruleForm.address" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">
        注册
      </el-button>
      <el-button type="primary" @click="submitFormQuit">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, reactive, computed ,onMounted} from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
  // props: {
  //   goodsid: String,
  //   required: true
  // },

  setup() {
    const formSize = ref('default');
    const ruleFormRef = ref();
    const ruleForm = reactive({
      user_name: '',
      user_password: '',
      confirm_password: '',
      phone:'',
      address:'',
    });

    //
    // onMounted(async () => {
    //   let states = ref('未登录');
    //   try {
    //     // 假设返回的状态值为status
    //     const response = await axios.get('http://localhost:8080/user/isLogin');
    //     states.value = response.data.msg;
    //     if(states.value=='未登录'){
    //       window.location.hash = '/login';
    //     }
    //     console.log(states)
    //
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })


    const isConfirmPasswordValid = computed(() => {
      return ruleForm.user_password === ruleForm.confirm_password;
    });

    const validationErrors = reactive({
      user_name: '',
      user_password: '',
      confirm_password: '',
      phone:'',
      address:'',
    });

    const rules = reactive({
      user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      user_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
      confirm_password: [{ required: true, message: '请确认密码', trigger: 'blur' }],
      phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
      address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
    });


    const openConfirmationDialogSuccess = () => {
      ElMessageBox.alert('注册成功', '成功', {
        confirmButtonText: 'OK',
        callback: (action) => {
          if (action === 'confirm') {
            console.log('Navigating to home page!');
            // 成功，执行页面导航到首页
            self.location='/';
          }
        },
      });
    };
    const openConfirmationDialogFail = () => {
      ElMessageBox.alert('注册失败', '失败', {
        confirmButtonText: 'OK',
      });
    };

    const submitFormQuit = () => {
      window.location.hash ='/GoodsInfo';
    };
    const submitForm = async () => {
      if (!isConfirmPasswordValid.value) {
        ElMessage.error('需要和新密码一致');
      }
      if (!ruleForm.new_password) {
        // 如果新密码为空，显示错误消息
        ElMessage.error('密码不能为空');
        return;
      }
      if(!(ruleForm.new_password === ruleForm.confirm_password)){
        ElMessage.error('需要和新密码一致');
        return;
      }
      try {
        const data = new FormData();
        data.append('username', ruleForm.user_name);
        data.append('password', ruleForm.user_password);
        data.append('phone', ruleForm.phone);
        data.append('location', ruleForm.address);
        const response = await axios.post('http://localhost:8080/user/register', data);
        console.log(response.data.msg);
        if (response.data.msg=='注册成功') {
          openConfirmationDialogSuccess();
        } else {
          openConfirmationDialogFail();
        }
      } catch (error) {
        console.error(' error server:', error);
        openConfirmationDialogFail(); // Display an error message
      }
    };

    const validateInput = (field) => {
      ruleFormRef.value.validateField(field);
    };

    return {
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
      validationErrors,
      openConfirmationDialogSuccess,
      openConfirmationDialogFail,
      submitForm,
      validateInput,
      submitFormQuit,
    };
  },
};
</script>

<style scoped>

</style>