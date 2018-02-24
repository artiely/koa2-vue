<template>
  <div class="index">
    <mt-header  title="index"></mt-header>
    <div class="page-content">
      <scroller :on-refresh="refresh" :on-infinite="infinite">
        <ArticleItem :data="data" @to-detail="toDetail"></ArticleItem>
      </scroller>
    </div>
  </div>
</template>
<script>
import ArticleItem from '../components/article-item/ArticleItem'
// import data from '../assets/juejin-like.json'
import * as types from '../vuex/mutation-types'
// import axios from 'axios'
export default {
  components: {
    ArticleItem
  },
  name: 'index',
  data() {
    return {
      data: [],
      params: {
        page: 1,
        limit: 4
      }
    }
  },
  methods: {
    toDetail(detail) {
      this.$store.commit(types.ARTICLE_DETAIL, detail)
      this.$router.push('/detail')
    },
    getData(cb) {
      void (async() => {
        const res = await this.$api.GET_JUEJIN(this.params)
        if (this.params.page === 1) {
          this.data = res.data
          this.params.page++
        } else {
          if (res.data.length > 0) {
            this.data = this.data.concat(res.data)
            this.params.page++
          }
        }
        cb && cb()
      })()

      // axios.get(`/api/v0/juejin/${this.params.page}/${this.params.limit}`).then(res => {
      //   if (this.params.page === 1) {
      //     this.data = res.data.data
      //     this.params.page++
      //   } else {
      //     if (res.data.data.length > 0) {
      //       this.data = this.data.concat(res.data.data)
      //       this.params.page++
      //     }
      //   }
      //   cb && cb()
      // })
    },
    refresh(done) {
      this.params.page = 1
      this.getData(() => {
        done()
      })
    },
    infinite(done) {
      this.getData(() => {
        done(true)
      })
    }
  }
}
</script>
