<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content">
      <scroller :on-refresh="refresh" :on-infinite="infinite">
        <ArticleItem :data="data" @to-detail="toDetail"></ArticleItem>
      </scroller>
    </div>
  </div>
</template>
<script>
import ArticleItem from '../components/article-item/ArticleItem'
import data from '../assets/juejin-like.json'
import * as types from '../vuex/mutation-types'
export default {
  components: {
    ArticleItem
  },
  name: 'index',
  data() {
    return {
      data: data.slice(0, 10)
    }
  },
  methods: {
    toDetail(detail) {
      this.$store.commit(types.ARTICLE_DETAIL, detail)
      this.$router.push('/detail')
    },
    refresh() {
    },
    infinite() {
    }
  }
}
</script>
