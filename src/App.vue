<template>
    <top></top>
</template>

<script>
import Top from "@/components/top.vue";
import usertop from "@/components/usertop.vue";
import {ref, onMounted} from "vue";
import axios from "axios";

export default {
  components: {
    Top,
    usertop,
  },
};
</script>
