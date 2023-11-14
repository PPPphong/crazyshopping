<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="150"/>
    <el-table-column prop="phone" label="电话号码" width="150"/>
    <el-table-column prop="address" label="地址" width="150"/>
  </el-table>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'

export default {

  setup() {
    const tableData = ref([]) // 使用ref创建响应式的tableData


    onMounted(async () => {
      let states = ref('未登录');

      try {
        // 假设返回的状态值为status
        const response = await axios.get('http://localhost:8080/user/isLogin');
        states.value = response.data.msg;
        if (states.value === '未登录') {
          window.location.hash = '/login';
        }
        console.log(states)

      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.get(
            'http://localhost:8080/orders'
        )
        tableData.value = response.data.ordersList // 将获取到的数据赋值给tableData
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