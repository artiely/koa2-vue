<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content" style="top:60px">
      <scroller :on-refresh="refresh" :on-infinite="infinite">
        <div v-for="item in data" :key="item.groupId" class="pic-item" @click="toDetail(item)">
          <img :src="item.poster" alt="">
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
    }
  },
  created() { }
}
</script>
<style lang="less" scoped>

</style>
