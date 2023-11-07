<template>
  <img :src="imgSrc" class="demo1">
</template>

<script>
import axios from 'axios'

export default {
  name: 'Pic',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgSrc: ''
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
          `http://localhost:8080/goods/images/`+this.src

      )

      this.imgSrc = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style>
.demo1{
  width: 500px;
  height: auto;
}
</style>
