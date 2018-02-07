<template>
  <div class="detail">
    <mt-header fixed title="detail">
    <mt-button @click="back" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="page-content">
       <main class="container main-container">
         <div class="book-section-view" v-for="item in data" :key="item.title">
        <div v-html="item.content"></div>
      </div>
      </main>
    </div>
  </div>
</template>
<script>
import data from '../assets/juejin-like.json'
import $ from 'n-zepto'
export default {
  name: 'detail',
  data() {
    return {
      data: data
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  mounted() {
    this.$nextTick(() => {
      $('img').each((i, el) => {
        $(el).attr('src', $(el).data('src'))
      })
    })
  }
}
</script>
<style>
@import "../assets/style/juejin.css";
</style>
