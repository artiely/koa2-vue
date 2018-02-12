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
          <div @click="tomeizi">
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
          <div @click="toshijue">
            <div class="swiper-icon">
              <i-icon name="icon-sheji" symbol></i-icon>
            </div>
            <p class="swiper-text">设计</p>
          </div>
        </swiper-slide>
      </swiper>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'fun',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        freeMode: true
      }
    }
  },
  methods: {
    toshijue() {
      this.$router.push('/shijue')
    },
    tomeizi() {
      this.$router.push('/meizi')
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
