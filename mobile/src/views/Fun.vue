<template>
  <div class="fun">
    <mt-header fixed title="fun"></mt-header>
    <div class="page-content">
      <swiper :options="swiperOption">
        <swiper-slide :class="{'nav-active':path=='/movie'}">
          <div  @click="tomovie">
            <div class="swiper-icon">
              <i-icon name="icon-dianying" symbol></i-icon>
            </div>
            <p class="swiper-text">影视</p>
          </div>
        </swiper-slide>
        <swiper-slide :class="{'nav-active':path=='/meizi'}">
          <div @click="tomeizi">
            <div class="swiper-icon">
              <i-icon name="icon-tupian1" symbol></i-icon>
            </div>
            <p class="swiper-text">福利</p>
          </div>
        </swiper-slide>
        <swiper-slide :class="{'nav-active':path=='/news'}">
          <div>
            <div class="swiper-icon">
              <i-icon name="icon-xinwen" symbol></i-icon>
            </div>
            <p class="swiper-text">新闻</p>
          </div>
        </swiper-slide>
        <swiper-slide :class="{'nav-active':path=='/shijue'}">
          <div @click="toshijue">
            <div class="swiper-icon">
              <i-icon name="icon-chuangyi" symbol></i-icon>
            </div>
            <p class="swiper-text">设计</p>
          </div>
        </swiper-slide>
      </swiper>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fun',
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        freeMode: true
      }
    }
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  methods: {
    toshijue() {
      this.$router.push('/shijue')
    },
    tomeizi() {
      this.$router.push('/meizi')
    },
    tomovie() {
      this.$router.push('/movie')
    }
  }
}
</script>
<style lang="less" scoped>
.fun .nav-active {
  background: #ddd;
}
.swiper-icon {
  font-size: 24px;
  text-align: center;
}
.swiper-text {
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.swiper-slide {
  text-align: center;
  width: 30%;
  height: 60px;
  background: #eee;
}
.fun .page-content .page-content {
  top: 60px;
}
</style>
