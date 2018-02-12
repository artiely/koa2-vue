<template>
  <div class="index">
    <mt-header fixed title="index"></mt-header>
    <div class="page-content">
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
import data from '../../assets/meizi.json'
import * as types from '../../vuex/mutation-types'
export default {
  name: 'shijue',
  data() {
    return {
      data: data
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
    refresh() { },
    infinite() { }
  },
  created() { }
}
</script>
<style lang="less" scoped>

</style>
