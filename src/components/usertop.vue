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
      <router-link to="/login">登录</router-link></el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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