<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content">
      <scroller :on-refresh="refresh" :on-infinite="infinite">
        <div v-for="item in data" :key="item.id">
          {{item.title}}
         <img :src="'http://qiniu.08tj.com/'+item.posterKey" alt="">
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
      data: []
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
  },
  created() {
    axios.get('/api/shijue').then(res => {
      console.log('请求结果', res)
      this.data = res.data.data
    })
  }
}
</script>
<style>
img{
  width: 100%;
  display: block;
}
</style>
