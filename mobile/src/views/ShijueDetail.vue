<template>
  <div class="detail">
    <mt-header fixed :title="data.title">
      <mt-button @click="back" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="page-content">
      <div class="detail-page shijue-detail">
        <scroller>
          <main class="container main-container">
          <div class="book-section-view">
            <h1>{{data.title}}</h1>
            <div class="alert-tip">高清大图,加载缓慢（小心您的流量）</div>
            <div v-html="data.content"></div>
            <div class="tags-wrapper"><span class="detail-tag" v-for="tag in data.tags" :key="tag">{{tag}}</span></div>
          </div>
        </main>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'n-zepto'
export default {
  name: 'detail',
  data() {
    return {}
  },
  computed: {
    data() {
      let _data = this.$store.state.article.articleDetail
      var r = /style="[^"]*"/gi
      _data.content = _data.content.replace(r, '')
      return _data
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  mounted() { },
  activated() {
    this.$nextTick(() => {
      $('.video-box').hide()
    })
  }
}
</script>
<style scoped lang="less">
.detail-page {
  background: #fff;
  overflow: hidden;
}

</style>
