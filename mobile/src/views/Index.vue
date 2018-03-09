<template>
  <div class="index">
    <mt-header  title="index"></mt-header>
    <div class="page-content">
      <scroller ref="myScroller" :on-refresh="refresh" :on-infinite="infinite">
        <ArticleItem :data="data" @to-detail="toDetail" @getsp="getScrollPosition"></ArticleItem>
      </scroller>
    </div>
  </div>
</template>
<script>
import ArticleItem from '../components/article-item/ArticleItem'
import * as types from '../vuex/mutation-types'
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
    },
    getScrollPosition() {
      let p = this.$refs.myScroller.getPosition()
      sessionStorage.setItem('scrollTop', p.top)
    },
    setScrollerPosition() { // 设置滚动条位置
      let y = sessionStorage.getItem('scrollTop')
      if (!y) {
        y = 0
      }
      setTimeout(() => {
        this.$refs.myScroller.scrollTo(0, y, false)
      }, 17)
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
  },
  activated() {
    this.$nextTick(() => {
      this.setScrollerPosition()
    })
  }
}
</script>
