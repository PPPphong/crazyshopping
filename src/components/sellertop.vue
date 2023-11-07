<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
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
<!--      <el-menu-item index="2-1">-->
<!--        <div>-->
<!--          <router-link to="/UploadGoods">发布商品</router-link>-->
<!--        </div>-->
<!--      </el-menu-item>-->
      <el-menu-item index="2-2">
        <div>
          <router-link to="/ordersmanager">订单管理</router-link>
        </div>
      </el-menu-item>
      <el-menu-item index="2-3">
        <div>
          <router-link to="/historygoods">历史商品</router-link>
        </div>
      </el-menu-item>
      <el-menu-item index="2-4">
        <div>
          <router-link to="/changepwd">修改密码</router-link>
        </div>
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