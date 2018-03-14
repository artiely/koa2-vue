<template>
  <div class="find">
    <mt-header  title="find"></mt-header>
    <div class="page-content">
      <scroller>
        <div class="tag-box">
          <span @click="showArticle(tag.articles)" class="tag-find" v-for="tag in tags" :key="tag._id">{{tag.name}}</span>
        </div>
        <div style="height:100px"></div>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: 'find',
  data() {
    return {
      tags: null
    }
  },
  methods: {
    async getDate() {
      let res = await this.$api.GET_TAGS({ page: 1, limit: 100 })
      this.tags = res.data
    },
    async showArticle(ids) {
      let res = await this.$api.GET_JUEJIN({ page: 1, limit: 10, ids: ids })
      console.log(res)
    }
  },
  created() {
    this.getDate()
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
