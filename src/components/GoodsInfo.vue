<template>
  <el-row  class="container">
    <el-card :body-style="{ padding: '0px' }">
      <div :key="productImg">
        <template v-if="productImg">
          <Pic :src="productImg"></Pic>
        </template>
      </div>
      <div style="padding: 14px">
        <span>商品名：{{ productName }}</span>
        <p>商品信息：{{ productDescription }}</p>
        <p>价格: ￥{{ productPrice }}元</p>
        <div class="bottom">
          <time class="time">{{ currentDate }}</time>
          <div v-if="states === '未登录'">
          <el-button text class="button">
            <router-link :to="{path:'/Buy',query: {productId}}">购买</router-link>
          </el-button>
          </div>
          <div v-if="states === '已登录'">
          <el-button text class="button">
            <router-link :to="{path:'/EditGoods',query: {productId}}">修改</router-link>
          </el-button>
          <el-button text class="button" @click="removeProduct">下架</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </el-row>
</template>



<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted } from 'vue'
import Pic from "./pic.vue";
import Buy from "./Buy.vue";
import EditGoods from "./EditGoods.vue"
import axios from "axios";


const currentDate = ref(new Date())
const productName = ref('请联系商家上架')
const productDescription = ref('')
const productId = ref('')
const productPrice = ref(0)
const productImg = ref('')
const states =ref('未登录')


const fetchProductInfo = async () => {
  // 这里可以使用实际的后端 API 地址
  const apiUrl = 'http://localhost:8080/goods/onenable'

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
    //console.log(productImg.value.toString())
  } catch (error) {
    console.error('Error fetching product info:', error)
  }
}


const showConfirmationDialog = () => {
  return ElMessageBox.confirm('确认下架该商品吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })
}
const RemoveProductSuccessDialog = () => {
  ElMessageBox.alert('商品下架成功', '成功', {
    confirmButtonText: '返回主页',
    callback: (action) => {
      if (action === 'confirm') {
        console.log('Navigating to home page!');
        self.location='/';
      }
    },
  });
}
const isLogin = async () => {
  try {
    // 假设返回的状态值为status
    const response = await axios.get('http://localhost:8080/user/isLogin');
    states.value = response.data.msg;
    console.log(states.value);
  } catch (error) {
    console.log(error);
  }
};


onMounted( () => {
  fetchProductInfo();
   isLogin();
});
const removeProduct = async () => {
  const isConfirm = await showConfirmationDialog();
  if (isConfirm) {
    let data = {
      id: productId.value
    };
    try {
      await axios.put('http://localhost:8080/goods/delete/' + data.id);
      RemoveProductSuccessDialog()
    } catch (error) {
      console.log(error);
    }
  }
}

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



