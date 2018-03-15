<template>
  <div class="chat">
    <mt-header fixed title="我叫Eva">
      <mt-button @click="back" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="page-content">
      <scroller class="eva-box">
          <table class="chat-list">
            <tr v-for="(v,i) in chatList" :key="i">
            <td><div class="chat-item" :class="v.userid=='eva'?'eva':'me'">{{v.text}}</div></td>
          </tr>
          </table>
        <p>{{text}}</p>
        <input type="text" v-model="params.info"><button @click="chat">发射</button>
      </scroller>
    </div>
  </div>
</template>
<script>
import $ from 'n-zepto'
export default {
  name: 'chat',
  data() {
    return {
      params: {
        key: '6af2c33fe0d2463c8841882a9bfc16f5',
        userid: '216761',
        info: ''
      },
      chatList: [
        {
          text: '你好',
          userid: 'eva'
        },
        {
          text: '如果所有',
          userid: '216761'
        },
        {
          text: '你傻了吧',
          userid: 'eva'
        },
        {
          text: '如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍',
          userid: '216761'
        }
      ]
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    chat() {
      let _this = this
      _this.chatList.push({ text: this.params.info, userid: '216761' })
      $.ajax({
        url: 'http://www.tuling123.com/openapi/api',
        type: 'post',
        data: this.params,
        dataType: 'json',
        success: (r) => {
          if (r.code === 100000) {
            _this.chatList.push({ text: r.text, userid: 'eva' })
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
.chat-list {
  width: 100%;
  .chat-item {
    text-align: left;
    background: #eee;
    border-radius: 5px;
    padding: 6px 10px;
    display: inline-block;
  }
  .eva {
  }
  .me {
    float: right;
    background: #abcdef;
  }
}
.eva-box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.eva-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>
