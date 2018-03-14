<template>
  <div class="find">
    <mt-header title="find"></mt-header>
    <div class="page-content">
      <scroller>
        <div class="tag-box">
          <span @click="showArticle(tag.articles)" class="tag-find" v-for="tag in tags" :key="tag._id">{{tag.name}}</span>
        </div>
        <div style="height:100px"></div>
      </scroller>
    </div>
    <mt-popup v-model="popupVisible" position="left" style="width:80%;height:100%">
      <scroller ref="myScroller" :on-refresh="refresh" :on-infinite="infinite">
        <ArticleItem :data="data" @to-detail="toDetail" @getsp="getScrollPosition"></ArticleItem>
      </scroller>
    </mt-popup>
  </div>
</template>

<script>
import ArticleItem from '../components/article-item/ArticleItem'
import * as types from '../vuex/mutation-types'
export default {
  name: 'find',
  components: {
    ArticleItem
  },
  data() {
    return {
      tags: null,
      popupVisible: false,
      data: [],
      params: {
        page: 1,
        limit: 3,
        ids: null
      },
      idsStr: ''
    }
  },
  methods: {
    async getData() {
      let res = await this.$api.GET_TAGS({
        page: 1,
        limit: 100
      })
      this.tags = res.data
    },
    async getArticle(cb) {
      this.idsStr = JSON.stringify(this.params.ids)
      let res = await this.$api.GET_JUEJIN(this.params)
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
    },
    showArticle(ids) {
      this.params.ids = ids
      this.popupVisible = true
      if (JSON.stringify(this.params.ids) === this.idsStr) {
        console.log('一样滴')
        return
      }
      this.getArticle()
    },
    toDetail(detail) {
      this.$store.commit(types.ARTICLE_DETAIL, detail)
      this.$router.push('/detail')
    },
    refresh(done) {
      this.params.page = 1
      this.getArticle(() => {
        done()
      })
    },
    infinite(done) {
      this.getArticle(() => {
        done(true)
      })
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
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style>
.tag-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tag-find {
  padding: 6px 8px;
  margin: 6px;
  display: inline-block;
  background: #fff;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
