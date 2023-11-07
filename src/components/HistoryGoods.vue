<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="编号" width="120"/>
    <el-table-column label="图片" width="150">
      <template #default="{ row }">
        <Pic2 :src="row.img"></Pic2>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="商品名称" width="150"/>
    <el-table-column prop="price" label="价格" width="150"/>
    <el-table-column prop="info" label="描述" width="150"/>
    <el-table-column prop="isFreeze" label="是否冻结" width="150"/>
    <el-table-column prop="onEnable" label="是否上架" width="150"/>
  </el-table>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import Pic2 from "@/components/pic2.vue";

export default {
  components: {Pic2},
  setup() {
    const tableData = ref([]) // 使用ref创建响应式的tableData

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

      };
      try {
        const response = await axios.get(
            'http://localhost:8080/goods'
        )
        tableData.value = response.data.goodsList // 将获取到的数据赋值给tableData
      } catch (error) {
        console.log(error)
      }
    })



    return {
      tableData,
    }
  }
}
</script>