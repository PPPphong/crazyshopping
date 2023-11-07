<template>
  <h1>购买商品</h1>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="电话号码" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>
    <el-form-item label="日期">
    <div class="demo-date-picker">
      <el-date-picker
          v-model="ruleForm.date1"
          type="date"
          placeholder="Pick a day"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          :rules="[
        {
          required: true,
          message: '日期不能为空',
          trigger: 'change'
        }
      ]"
      >
        <template #default="cell" >
          <div class="cell" :class="{ current: cell.isCurrent }">
            <span class="text">{{ cell.text }}</span>
          </div>
        </template>
      </el-date-picker>
    </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        购买
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>

      <el-button type="primary" @click="submitFormQuit">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
    interface RuleForm {
      name: string
      phone: string
      date1: string
    }
const value = ref('2021-10-29')

    const url = window.location.href;
    const temp = url.split('?')[1];
    const urlParams = new URLSearchParams('?'+temp);
    const GoodId = urlParams.get('productId');
    const route = useRouter().currency;
    const formSize = ref('default')
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive<RuleForm>({
      name: '',
      phone: '',
      date1: '',
      productId:GoodId,
    })
    const rules = reactive<FormRules<RuleForm>>({
      name: [
        {required: true, message: 'Please input your name', trigger: 'blur'},
        {min: 2, max: 5, trigger: 'blur'},
      ],
      phone: [
        {required: true, message: 'Please input your phone', trigger: 'blur'},
        {min: 11, max: 11, trigger: 'blur'},
      ],
      date1: [
        {
          required: true,
          message: '日期不能为空',
          trigger: 'change',
        },
      ],
    })

    const submitFormQuit = () => {
      window.location.hash ='/GoodsInfo';
    };

const openConfirmationDialogSuccess = () => {
  ElMessageBox.alert('订单创建成功', '成功', {
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
  ElMessageBox.alert('订单创建失败', '失败', {
    confirmButtonText: 'OK',
  });
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if((ruleForm.name.length<2)||(ruleForm.name.length>5)){
    ElMessage.error('姓名长度须在2-5');
  }
  if(ruleForm.phone.length !=11){
    ElMessage.error('号码长度必须为11');
  }
  if (!(ruleForm.date1)) {
    ElMessage.error('日期不能为空');
    return;
  }
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const data = new FormData();
      data.append('name', ruleForm.name);
      data.append('phone', ruleForm.phone);
      data.append('time',ruleForm.date1);
      data.append('goodsId',ruleForm.productId)
      try {
        const response = await axios.post('http://localhost:8080/orders', data);
        if (response.status === 200) {
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
    } else {
      console.log('error submit!', fields)
    }
  })
}

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const options = Array.from({length: 10000}).map((_, idx) => ({
      value: `${idx + 1}`,
      label: `${idx + 1}`,
    }))


</script>


<style scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>