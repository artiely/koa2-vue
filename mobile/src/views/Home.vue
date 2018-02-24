<template>
  <div class="home">
    <!-- <mt-header fixed title="固定在顶部"></mt-header> -->
    <transition :name="transitionName" appear >
      <keep-alive>
        <router-view class="RouterView" />
      </keep-alive>
    </transition>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="1">
        <i-icon slot="icon" name="icon-hangyezixun" symbol></i-icon>
        阅读
      </mt-tab-item>
      <mt-tab-item id="2">
        <i-icon slot="icon" name="icon-zhinengsousuo" symbol></i-icon>
        发现
      </mt-tab-item>
      <mt-tab-item id="3">
        <i-icon slot="icon" name="icon-rengongzhineng" symbol></i-icon>
        聊天
      </mt-tab-item>
      <mt-tab-item id="4">
        <i-icon slot="icon" name="icon-vr" symbol></i-icon>
        课外
      </mt-tab-item>
      <mt-tab-item id="5">
        <i-icon slot="icon" name="icon-zhinengyun" symbol></i-icon>
        更多
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      selected: '1',
      transitionName: 'slide-left'
    }
  },
  watch: {
    selected: {
      handler(val, oval) {
        switch (val) {
          case '1':
            this.$router.push('/index')
            break
          case '3':
            this.$router.push('/chat')
            break
          case '2':
            this.$router.push('/find')
            break
          case '4':
            this.$router.push('/fun')
            break
          case '5':
            this.$router.push('/user')
            break
        }
        if (oval > val) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      }
    }
  },
  methods: {
    selectPath() {
      let urlmark = this.$route.path
      switch (urlmark) {
        case '/home':
          this.selected = '1'
          break
        case '/':
          this.selected = '1'
          break
        case '/index':
          this.selected = '1'
          break
        case '/chat':
          this.selected = '3'
          break
        case '/find':
          this.selected = '2'
          break
        case '/fun':
          this.selected = '4'
          break
        case '/shijue':
          this.selected = '4'
          break
        case '/movie':
          this.selected = '4'
          break
        case '/meizi':
          this.selected = '4'
          break
        case '/user':
          this.selected = '5'
          break
      }
    }
  },
  mounted() {
    this.selectPath()
  }
}
</script>
