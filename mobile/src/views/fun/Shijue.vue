<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content" style="top:60px">
      <scroller :on-refresh="refresh" :on-infinite="infinite" noDataText="没有啦哟 (#^.^#)">
        <div class="shijue-item" v-for="(item,i) in data" :key="i" @click="toDetail(item)">
         <img :src="'http://qiniu.08tj.com/'+item.posterKey" alt="">
         <p> {{item.title}}</p>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import * as types from '../../vuex/mutation-types'
import axios from 'axios'
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
    toDetail(detail) {
      this.$store.commit(types.ARTICLE_DETAIL, detail)
      this.$router.push('/shijuedetail')
    },
    refresh(done) {
      this.params.page = 1
      this.getData(() => { done() })
    },
    infinite(done) {
      this.getData(() => { done(true) })
    },
    getData(cb) {
      axios.get(`/api/shijue/${this.params.page}/${this.params.limit}`).then(res => {
        if (this.params.page === 1) {
          this.data = res.data.data
          this.params.page++
        } else {
          if (res.data.data.length > 0) {
            this.params.page++
          }
          this.data = this.data.concat(res.data.data)
        }
        cb && cb()
      })
    }
  },
  created() {
  }
}
</script>
<style lang="less">
.shijue-item {
  padding: 6px;
  box-sizing: border-box;
  background: #fff;
}
img {
  width: 100%;
  display: block;
}
</style>
