<!--缩略图-->
<template>
  <img :src="imgSrc" class="demo2">
</template>

<script>
import axios from 'axios'

export default {
  name: 'Pic2',
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
      console.log("11")
      this.imgSrc = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style>
.demo2{
  width: 100px;
  height: auto;
}
</style>
