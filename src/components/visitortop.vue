<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      router
  >
    <el-menu-item index="/">
      CrazyShopping
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="login">
      登录
    </el-menu-item>
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

    return {
      activeIndex,
      handleSelect,
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