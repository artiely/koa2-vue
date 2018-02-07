<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content">
      <scroller :on-refresh="refresh" :on-infinite="infinite">
        <ArticleItem :data="data"></ArticleItem>
      </scroller>
    </div>
  </div>
</template>
<script>
import ArticleItem from '../components/article-item/ArticleItem'
import data from '../assets/juejin-like.json'
export default {
  components: {
    ArticleItem
  },
  name: 'index',
  data() {
    return {
      data: data
    }
  },
  methods: {
    toDetail() {
      this.$router.push('/detail')
    },
    refresh() {
    },
    infinite() {
    }
  }
}
</script>
