<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/counter" class="home">去往</a>
  </div>
</template>

<script>
import card from '@/components/card'
// import axios from 'axios'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      list: null
    }
  },
  components: {
    card
  },
  methods: {
    bindViewTap () {
      const url = '../logs/logs'
      wx.navigateTo({
        url
      })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getData () {
      wx.request({
        url: 'http://08tj.com/api/v0/juejin/1/10',
        // data:{},
        header: {'Content-Type': 'application/json'},
        success: function (res) {
          console.log(res)
        }
      })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getData()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.userinfo-nickname {
  color: #aaa;
}
.usermotto {
  margin-top: 150px;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
