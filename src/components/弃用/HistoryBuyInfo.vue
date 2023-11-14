<template>
  <el-row  class="container">
    <el-card :body-style="{ padding: '0px' }">
      <div :key="productImg">
        <template v-if="productImg">
          <Pic :src="productImg"></Pic>
        </template>
      </div>
      <div style="padding: 150px">
        <span>商品名：{{ productName }}</span>
        <p>商品信息：{{ productDescription }}</p>
        <p>价格: ￥{{ productPrice }}元</p>
        <p>时间: {{ time }}</p>
        <p>交易状态：{{ state }}</p>
        <p>用户名：{{ UserName }}</p>
        <p>电话：{{ phone }}</p>
        <p>地址：{{ address }}</p>
        <div class="bottom">
            <el-button text class="button">
              <router-link :to="{path:'/historybuy',}">返回</router-link>
            </el-button>
        </div>
      </div>
    </el-card>
  </el-row>
</template>



<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted } from 'vue'
import Pic from "../pic.vue";
import axios from "axios";


const productName = ref('')
const productDescription = ref('')
const productId = ref('')
const productPrice = ref('')
const productImg = ref('')
const loginstates =ref('未登录')
const state =ref('')
const time = ref('')
const UserName = ref('')
const phone =ref('')
const address = ref('')

const fetchProductInfo = async () => {
  // 这里可以使用实际的后端 API 地址
  const apiUrl = 'http://localhost:8080/history/{username}'

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    // 更新商品信息
    if(data.name!=null){

      productName.value = data.name
    }
    productId.value = data.id
    productDescription.value = data.info
    productPrice.value = data.price
    productImg.value=data.img
    UserName.value=data.username
    phone.value=data.phone
    address.value=data.location
    time.value=data.time
    state.value=data.state
    //console.log(productImg.value.toString())
  } catch (error) {
    console.error('Error fetching product info:', error)
  }
}

const isLogin = async () => {
  try {
    // 假设返回的状态值为status
    const response = await axios.get('http://localhost:8080/user/isLogin');
    loginstates.value = response.data.msg;
    console.log(loginstates.value);
  } catch (error) {
    console.log(error);
  }
};


onMounted( () => {
  fetchProductInfo();
  isLogin();
});


</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
</style>



