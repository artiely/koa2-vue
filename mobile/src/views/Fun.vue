<template>
  <div class="fun">
    <mt-header fixed title="fun"></mt-header>
    <div class="page-content">
      <swiper :options="swiperOption">
        <swiper-slide>
          <i-icon name="icon-dianying" symbol></i-icon>
          影视预览
        </swiper-slide>
        <swiper-slide>
          <i-icon name="icon-tupian1" symbol></i-icon>
          妹子福利
          </swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
      </swiper>
      <!-- <div v-for="item in data" :key="item" class="pic-item">
        <img :src="item" alt="">
      </div> -->
      <p v-for="i in 20" :key="i">{{i}}fun</p>
    </div>
  </div>
</template>

<script>
import data from '../assets/meizi.json'
export default {
  name: 'fun',
  data() {
    return {
      data: data[0].links,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        slidesPerView: 'auto'
      }
    }
  }
}
</script>
<style lang="less">
.pic-item {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
  img {
    width: 100%;
  }
}
.swiper-slide {
  text-align: center;
  width: 30%;
  height: 60px;
  background: #ddd;
}
</style>
