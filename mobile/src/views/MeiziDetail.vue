<template>
  <div class="detail">
    <mt-header fixed :title="data.title">
      <mt-button @click="back" icon="back" slot="left">返回</mt-button>
      <i-icon slot="right" name="icon-chanpin" ref="tip" symbol @click.native="showTip"></i-icon>
    </mt-header>
    <div class="page-content">
      <div class="detail-page meizi-detail">
        <scroller>
          <main class="container main-container">
          <div class="book-section-view">
            <div  class="links-box" :key="i" v-for="(pic,i) in data" >
              <img :src="pic" alt="">
            </div>
          </div>
        </main>
        </scroller>
        <mt-popup v-model="popupVisible"   class="mint-popup-1">
      <h1>佳句赏析</h1>
      <p>大丈夫生于天地之间，当读圣贤之书，养浩然正气，仿天地之德以爱人，效圣贤之志以成业。纵使无法成千秋事业，当时正己修心，积善取恶，也得心地坦荡，身性纯洁，也不失位丈夫之举。</p>
    </mt-popup>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {
      popupVisible: false,
      buttonBottom: 0
    }
  },
  computed: {
    data() {
      return this.$store.state.article.articleDetail.links
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    showTip() {
      this.popupVisible = !this.popupVisible
    }
  },
  mounted() {
    this.buttonBottom = this.$refs.tip.$el.getBoundingClientRect().bottom
  }
}
</script>
<style scoped lang="less">
.detail-page {
  background: #fff;
  overflow: hidden;
}
.mint-popup-1 {
  width: 200px;
  padding: 10px;
  top:130px;
  right:0px;
  h1 {
    font-size: 20px;
    color: #26a2ff;
  }
  p {
    margin-bottom: 10px;
  }
}
</style>
