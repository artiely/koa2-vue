<template>
  <div class="chat">
    <mt-header fixed title="chat"></mt-header>
    <div class="page-content">
      <scroller class="eva-box">
      <img @click="toEva" class="eva-img" :src="require('../assets/eva.jpg')" alt="">
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
    }
  },
  methods: {
    toEva() {
      this.$router.push('/eva')
    }
  }
}
</script>
<style>
.eva-box{
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.eva-img{
  width: 100%;
  height: 100vh;
  object-fit: cover
}
</style>
