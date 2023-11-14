<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="编号" width="120"/>
    <el-table-column label="图片" width="150">
      <template #default="{ row }">
        <Pic2 :src="row.img"></Pic2>
      </template>
    </el-table-column>
    <el-table-column prop="goodsName" label="商品名称" width="150"/>
    <el-table-column prop="name" label="姓名" width="150"/>
    <el-table-column prop="phone" label="电话号码" width="150"/>
    <el-table-column prop="goodsId" label="商品编号" width="150"/>
    <el-table-column prop="state" label="状态" width="150"/>
    <el-table-column prop="location" label="地址" width="150"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button v-show="row.state === '等待处理'" link type="primary" size="small" @click="acceptClick(row)">接受
        </el-button>
        <el-button v-show="row.state === '等待处理'" link type="primary" size="small" @click="declineClick(row)">拒绝
        </el-button>
        <el-button v-show="row.state === '已接受'" link type="primary" size="small" @click="completeClick(row)">完成
        </el-button>
        <el-button v-show="row.state === '已接受'" link type="primary" size="small" @click="failClick(row)">失败
        </el-button>
        <el-button v-show="row.state === '已拒绝'" link type="primary" size="small" @click="deleteClick(row)">删除
        </el-button>
        <el-button v-show="row.state === '交易失败'" link type="primary" size="small" @click="deleteClick(row)">删除
        </el-button>
        <el-button v-show="row.state === '已完成'" link type="primary" size="small" @click="deleteClick(row)">删除
        </el-button>
      </template>
    </el-table-column>
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
      // let states = ref('未登录');
      //
      // try {
      //   // 假设返回的状态值为status
      //   const response = await axios.get('http://localhost:8080/user/isLogin');
      //   states.value = response.data.msg;
      //   if (states.value === '未登录') {
      //     window.location.hash = '/login';
      //   }
      //   console.log(states)
      //
      // } catch (error) {
      //   console.log(error);
      // }

      try {
        const response = await axios.get(
            'http://localhost:8080/orders'
        )
        tableData.value = response.data.ordersList // 将获取到的数据赋值给tableData
      } catch (error) {
        console.log(error)
      }


    })

    const acceptClick = async (row) => {
      let data = {
        id: row.id
      }
      console.log(data.id)
      try {
        // 发送接受请求
        const acceptUrl = 'http://localhost:8080/orders/accept/' + data.id;
        await axios.put(acceptUrl);

        // 更新表格数据
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    const deleteClick = async (row) => {
      let data = {
        id: row.id
      }
      console.log(data.id)
      try {
        // 发送接受请求
        const deleteClick = 'http://localhost:8080/orders/' + data.id;
        await axios.delete(deleteClick);

        // 更新表格数据
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    const declineClick = async (row) => {
      let data = {
        id: row.id
      }
      console.log(data.id)
      try {
        // 发送接受请求
        const declineClick = 'http://localhost:8080/orders/refuse/' + data.id;
        await axios.put(declineClick);

        // 更新表格数据
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    const completeClick = async (row) => {
      let data = {
        id: row.id
      }
      console.log(data.id)
      try {
        // 发送接受请求
        const completeClick = 'http://localhost:8080/orders/finish/' + data.id;
        await axios.put(completeClick);

        //更新表格数据
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    const failClick = async (row) => {
      let data = {
        id: row.id
      }
      console.log(data.id)
      try {
        // 发送接受请求
        const failClick = 'http://localhost:8080/orders/fail/' + data.id;
        await axios.put(failClick);

        // 更新表格数据
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }


    return {
      tableData,
      acceptClick,
      declineClick,
      deleteClick,
      completeClick,
      failClick,
    }
  }
}
</script>