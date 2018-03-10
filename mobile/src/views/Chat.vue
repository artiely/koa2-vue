<template>
  <div class="chat">
    <mt-header fixed title="chat"></mt-header>
    <div class="page-content">
      <button @click="chat">聊天</button>
      开发中...
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'chat',
  data() {
    return {
      params: {
        'reqType': 0,
        'perception': {
          'inputText': {
            'text': '你好'
          },
          'inputImage': {
            'url': ''
          },
          'selfInfo': {
            'location': {
              'city': '',
              'province': '',
              'street': ''
            }
          }
        },
        'userInfo': {
          'apiKey': '6af2c33fe0d2463c8841882a9bfc16f5',
          'userId': '216761'
        }
      }
    }
  },
  methods: {
    chat() {
      axios({
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        method: 'post',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data: this.params
      }).then(_ => {
        console.log(_)
      })
    }
  }
}
</script>
