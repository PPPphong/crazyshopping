<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      router
  >
    <el-menu-item index="0">
      <a href="/">CrazyShopping</a>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <el-button link  @click="logout">退出登录</el-button>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>菜单</template>
      <el-menu-item index="ordersmanager">
          订单管理
      </el-menu-item>
      <el-menu-item index="historygoods">
        历史商品
      </el-menu-item>
      <el-menu-item index="changepwd">
        修改密码
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <router-view></router-view>
</template>

<script>
import { ref } from 'vue'
import axios from "axios";

export default {
  setup() {
    const activeIndex = ref('1')

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const logout = async () => {
      try {
        const logoutClick = `http://localhost:8080/user/logout`;
        const resp = await axios({
          method: 'GET',
          url: logoutClick,
        });
        self.location='/';
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      activeIndex,
      handleSelect,
      logout
    }
  }
}
</script>


<style>
.flex-grow {
  flex-grow: 1;
}
a{
  text-decoration: none;
}
</style>