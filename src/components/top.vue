<template>
  <div v-if="states === '0'">
    <sellertop></sellertop>
  </div>
  <div v-else-if="states === '1'">
    <usertop></usertop>
  </div>
  <div v-else-if="states === '2'">
    <visitortop></visitortop>
  </div>
<!--  <sellertop></sellertop>-->
</template>

<script>
import usertop from "@/components/usertop.vue";
import {ref, onMounted} from "vue";
import axios from "axios";
import Sellertop from "@/components/sellertop.vue";
import Visitortop from "@/components/visitortop.vue";


export default {
  components: {
    Visitortop,
    Sellertop,
    usertop,
  },
  setup() {
    let states = ref('2');

    const isLogin = async () => {
      try {
        // 假设返回的状态值为status
        const response = await axios.get('http://localhost:8080/user/level');
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
