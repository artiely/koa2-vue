<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content" style="top:60px">
      <scroller ref="myScroller" :on-refresh="refresh" :on-infinite="infinite">
        <div  v-for="item in data" :key="item.groupId" class="pic-item" @click="toDetail(item)">
          <img v-lazy="'http://qiniu.08tj.com/'+item.posterKey" alt="">
          <p v-if="item.title">{{item.title}}</p>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import * as types from '../../vuex/mutation-types'
export default {
  name: 'shijue',
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
    toshow(item) {
      this.links = item.links
      this.popupVisible = true
    },
    toDetail(detail) {
      this.getScrollPosition()
      this.$store.commit(types.ARTICLE_DETAIL, detail)
      this.$router.push('/meizidetail')
    },
    refresh(done) {
      this.params.page = 1
      this.getData(() => { done() })
    },
    infinite(done) {
      this.getData(() => { done(true) })
    },
    _canvasLoad(data) {

    },
    getData(cb) {
      void (
        async() => {
          const res = await this.$api.GET_MEIZI(this.params)
          if (this.params.page === 1) {
            this.data = res.data
            this.params.page++
          } else {
            if (res.data.length > 0) {
              this.params.page++
            }
            this.data = this.data.concat(res.data)
          }
          cb && cb()
        }
      )()
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
  created() { },
  activated() {
    this.$nextTick(() => {
      this.setScrollerPosition()
    })
  }
}
</script>
<style lang="less" scoped>

</style>
