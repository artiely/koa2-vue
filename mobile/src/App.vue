<template>
  <div id="app">
    <transition :name="transitionName" >
      <keep-alive>
        <router-view class="RouterView"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route': {
      handler(val, oval) {
        let isBack = this.$router.isBack
        console.log(isBack)
        if (isBack) {
          this.transitionName = 'leave'
          if (val.path === '/login') {
            this.$router.push('/index')
          }
        } else {
          this.transitionName = 'enter'
        }
        this.$router.isBack = false
      }
    }
  }
}
</script>

<style lang="less">
body{
  background: rgb(238, 252, 234);
}
.help{
  font-size: 14px;
  text-align: center;
  padding: 15px;
  color: #777;
}
.index {
  // background: rgb(241, 62, 62);
}
.find {
  background: rgb(62, 241, 151);
}
.order {
  background: rgb(14, 80, 110);
}
.user {
  background: rgb(241, 223, 62);
}
.detail {
  background: rgb(38, 194, 6);
}
</style>
