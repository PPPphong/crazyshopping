<template>
  <div>
    <h1>修改密码</h1>

    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon>
      <el-form-item label="原密码" prop="old_password">
        <el-input v-model="ruleForm.old_password" @blur="validateInput('old_password')" type="password"/>
        <el-message v-if="validationErrors.old_password" type="error">{{ validationErrors.old_password }}</el-message>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="ruleForm.new_password" @blur="validateInput('new_password')" type="password" />
        <el-message v-if="validationErrors.new_password" type="error">{{ validationErrors.new_password }}</el-message>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password">
        <el-input v-model="ruleForm.confirm_password" @blur="validateInput('confirm_password')" type="password" />
        <el-message v-if="validationErrors.confirm_password" type="error">{{ validationErrors.confirm_password }}</el-message>
      </el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, computed ,onMounted} from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
  props: {
    goodsid: String,
    required: true
  },

  setup() {
    const formSize = ref('default');
    const ruleFormRef = ref();
    const ruleForm = reactive({
      old_password: '',
      new_password: '',
      confirm_password: '',
    });


    onMounted(async () => {
      let states = ref('未登录');
      try {
        // 假设返回的状态值为status
        const response = await axios.get('http://localhost:8080/user/isLogin');
        states.value = response.data.msg;
        if(states.value=='未登录'){
          window.location.hash = '/login';
        }
        console.log(states)

      } catch (error) {
        console.log(error);
      }
    })


    const isConfirmPasswordValid = computed(() => {
      return ruleForm.new_password === ruleForm.confirm_password;
    });

    const validationErrors = reactive({
      old_password: '',
      new_password: '',
      confirm_password: '',
    });

    const rules = reactive({
      old_password: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
      confirm_password: [
        { required: true, message: '请确认密码', trigger: 'blur' },
      ],
    });


    const openConfirmationDialogSuccess = () => {
      ElMessageBox.alert('密码修改成功', '成功', {
        confirmButtonText: 'OK',
        callback: (action) => {
          if (action === 'confirm') {
            console.log('Navigating to home page!');
            // 密码修改成功，执行页面导航到首页
            self.location='/';
          }
        },
      });
    };
    const openConfirmationDialogFail = () => {
      ElMessageBox.alert('密码修改失败', '失败', {
        confirmButtonText: 'OK',
      });
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
      if (!ruleForm.confirm_password) {
        // 如果密码为空，显示错误消息
        ElMessage.error('不能为空');
        return;
      }
      if(!(ruleForm.new_password === ruleForm.confirm_password)){
        ElMessage.error('需要和新密码一致');
        return;
      }
      try {
        const data = new FormData();
        data.append('oldPassword', ruleForm.old_password);
        data.append('newPassword', ruleForm.new_password);
        const response = await axios.put('http://localhost:8080/user/update', data);
        console.log(response.data.msg);
        if (response.data.msg=='修改密码成功') {
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
    };
  },
};
</script>

<style scoped>

</style>