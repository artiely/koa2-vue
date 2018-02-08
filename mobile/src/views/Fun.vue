<template>
  <div class="fun">
    <mt-header fixed title="fun"></mt-header>
    <div class="page-content">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div>
            <div class="swiper-icon">
              <i-icon name="icon-dianying" symbol></i-icon>
            </div>
            <p class="swiper-text">影视</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="swiper-icon">
              <i-icon name="icon-tupian1" symbol></i-icon>
            </div>
            <p class="swiper-text">福利</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="swiper-icon">
              <i-icon name="icon-xinwen" symbol></i-icon>
            </div>
            <p class="swiper-text">新闻</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="swiper-icon">
              <i-icon name="icon-sheji" symbol></i-icon>
            </div>
            <p class="swiper-text">设计</p>
          </div>
        </swiper-slide>
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
        spaceBetween: 0,
        freeMode: true
      }
    }
  }
}
</script>
<style lang="less">
.swiper-icon {
  font-size: 24px;
  text-align: center;
}
.swiper-text {
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: #999;
}
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
  background: #eee;
}
</style>
