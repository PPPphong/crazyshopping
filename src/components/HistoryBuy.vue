<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="商品名称" width="330"/>
    <el-table-column prop="phone" label="商品预览图" width="330"/>
    <el-table-column prop="address" label="交易状态" width="330"/>
    <el-table-column prop="address" label="购买时间" width="330"/>
    <el-table-column fixed="right" label="查看详情" width="330">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="showClick(row)">查看
        </el-button>
      </template>
    </el-table-column>
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
            'http://localhost:8080/history/{username}'
        )
        tableData.value = response.data.ordersList // 将获取到的数据赋值给tableData
      } catch (error) {
        console.log(error)
      }


    })
    const showClick = async () => {
      self.location='/historybuyinfo';
    }

    return {
      tableData,
      showClick,
    }
  }
}
</script>