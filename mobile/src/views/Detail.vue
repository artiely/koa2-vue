<template>
  <div class="detail">
    <mt-header fixed :title="data.title">
      <mt-button @click="back" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="page-content">
      <div class="detail-page">
      <main class="container main-container">
        <div class="book-section-view">
          <h1>{{data.title}}</h1>
          <div v-html="data.content"></div>
          <div class="tags-wrapper"><span class="detail-tag" v-for="tag in data.tags" :key="tag">{{tag}}</span></div>
        </div>
      </main>
      <div class="author-info">
            <span class="author-icon">
              <img :src="data.avatar" alt="">
            </span>
            <span class="author-name">{{data.author}}</span>
            <span class="create-time">{{data.create_time}}</span>
          </div>
    </div>
    </div>
  </div>
</template>
<script>
import $ from 'n-zepto'
export default {
  name: 'detail',
  data() {
    return {
    }
  },
  computed: {
    data() {
      return this.$store.state.article.articleDetail
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  mounted() {
  },
  activated() {
    this.$nextTick(() => {
      $('.book-section-view img').each((i, el) => {
        $(el).attr('src', $(el).data('src'))
      })
    })
  }
}
</script>
<style scoped lang="less">
.detail-page {
  background: #fff;
}
.author-info {
  border-top: 1px solid #eee;
  padding: 8px;

  .author-icon {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .author-name {
    font-size: 14px;
    vertical-align: top;
  }
  .create-time {
    font-size: 12px;
    color: #999;
    vertical-align: super;
  }
}
.tags-wrapper {
  width: 100%;
  overflow: hidden;
}
.detail-tag {
  background: #eee;
  padding: 4px 6px;
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 6px;
  white-space: nowrap;
}
</style>
