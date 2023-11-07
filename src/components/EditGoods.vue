<template>
  <div>
    <h1>修改商品</h1>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <el-form-item label="商品名" prop="good_name">
        <el-input v-model="ruleForm.good_name" />
      </el-form-item>
      <el-form-item label="商品信息" prop="good_info">
        <el-input v-model="ruleForm.good_info" />
      </el-form-item>
      <el-form-item label="商品价格" prop="good_price">
        <el-input v-model="ruleForm.good_price" @blur="validateInput('good_price')" />
        <!--        <el-message v-if="validationErrors.good_price" type="error">{{ validationErrors.good_price }}</el-message>-->
      </el-form-item>
      <el-form-item label="商品预览图:">
        <el-upload
            :http-request="httpRequest"
            multiple
            :show-file-list="true"
            list-type="picture-card"
        ><el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          修改
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFormQuit">
          取消
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { ref, reactive, computed,onMounted } from 'vue';
import axios from 'axios'
import {ElMessage, ElMessageBox } from 'element-plus'
export default {

    setup() {
    const url = window.location.href;
    const temp = url.split('?')[1];
    const urlParams = new URLSearchParams('?'+temp);
    const GoodId = urlParams.get('productId');
    const fileUploadRef = ref([]);
    const formSize = ref('default');
    const ruleFormRef = ref();
    const ruleForm = reactive({
      good_price: '',
      good_name: '',
      good_info: '',
    });

    function httpRequest(option) {
      fileUploadRef.value.push(option)
    }


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

    const isNumber = computed(() => {
      const pricePattern = /^\d+(\.\d{1,2})?$/;
      return pricePattern.test(ruleForm.good_price);
    });

    const validationErrors = reactive({
      good_price: '',
      good_name: '',
      good_info: '',
    });

    const rules = reactive({
      good_name: [{ required: true, message: '请输入商品名', trigger: 'blur' },
      ],
      good_info: [
        { required: true, message: '请输入商品信息', trigger: 'blur' },
      ],
      good_price: [
        { required: true,  message:'请输入价格',trigger: 'blur' },
        {
          validator: () => {
            validationErrors.good_price = '';
            if (!isNumber.value) {
              validationErrors.good_price = '价格必须为数字';
            }
          }, trigger: 'blur' },
      ],
    });


    const openConfirmationDialogSuccess = () => {
      ElMessageBox.alert('商品信息修改成功', '成功', {
        confirmButtonText: '返回主页',
        callback: (action) => {
          if (action === 'confirm') {
            console.log('Navigating to home page!');
            self.location='/';
          }
        },
      });
    };


    const openConfirmationDialogFail = () => {
      ElMessageBox.alert('商品信息修改失败', '失败', {
        confirmButtonText: 'OK',
      });
    };
    const submitFormQuit = () => {
      window.location.hash ='/GoodsInfo';
    };
    const submitForm = async () => {
      if(!(ruleForm.good_name)){
        ElMessage.error('请输入商品名');
      }
      if(!(ruleForm.good_info)){
        ElMessage.error('请输入商品信息');
      }
      if (!(ruleForm.good_price)) {
        ElMessage.error('请输入商品价格');
        return;
      }
      const formData = new FormData();
      formData.append('name', ruleForm.good_name);
      formData.append('info', ruleForm.good_info);
      formData.append('price', ruleForm.good_price);
      fileUploadRef.value.forEach((it,index)=>{
        formData.append('imgFile',it.file)
      })
      let data = {
           id: GoodId
      };
      try {
        console.log(GoodId)
        const response = await axios.put('http://localhost:8080/goods/'+data.id, formData, {"Content-Type": "multipart/form-data"});
        console.log(response.data.msg);
        if (response.data.status === 200) {
          openConfirmationDialogSuccess();
          console.log('Data successfully sent to the server!');
        } else {
          openConfirmationDialogFail();
          console.error('Server returned an error:', response.data);
        }
      } catch (error) {
        openConfirmationDialogFail();
        console.error('An error occurred while sending data to the server:', error);
      }
    };
    const validateInput = (field) => {
      ruleFormRef.value.validateField(field);
    };

    const beforeUpload = (file) => {
      // 在上传之前可以对文件进行验证，例如文件类型和大小的验证
      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPGOrPNG) {
        this.$message.error('只能上传 JPG/PNG 文件');
      }
      const isLt500KB = file.size / 1024 < 500;
      if (!isLt500KB) {
        this.$message.error('图片大小不能超过 500KB');
      }
      return isJPGOrPNG && isLt500KB;
    };


    const handleUploadSuccess = (response, file) => {
      // 上传成功后的处理逻辑
      fileUploadRef.value = URL.createObjectURL(file.raw)
      console.log('Upload success:', response,{ headers });
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
      beforeUpload,
      handleUploadSuccess,
      submitFormQuit,
      httpRequest
    };
  },
};
</script>

<style scoped>
</style>