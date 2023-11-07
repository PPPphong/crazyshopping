<template>
  <div v-if="states === '已登录'">
    <sellertop></sellertop>
  </div>
  <div v-else-if="states === '未登录'">
    <usertop></usertop>
  </div>
</template>

<script>
import usertop from "@/components/usertop.vue";
import {ref, onMounted} from "vue";
import axios from "axios";
import Sellertop from "@/components/sellertop.vue";


export default {
  components: {
    Sellertop,
    usertop,
  },
  setup() {
    let states = ref('未登录');

    const isLogin = async () => {
      try {
        // 假设返回的状态值为status
        const response = await axios.get('http://localhost:8080/user/isLogin');
        states.value = response.data.msg;

      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      await isLogin();
    });

    return {
      states,
      isLogin
    };
  },
};
</script>
