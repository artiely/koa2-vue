<template>
  <div class="detail">
    <mt-header fixed :title="data.title" >
      <mt-button @click="back" icon="back" slot="left">返回</mt-button>
    </mt-header>
    <div class="page-content">
      <div class="detail-page meizi-detail">
        <scroller>
          <main class="container main-container">
          <div class="book-section-view">
            <h1>{{data.title}}</h1>
            <div id="player"></div>
          </div>
        </main>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
// import 'dplayer'
export default {
  name: 'detail',
  data() {
    return {
    }
  },
  computed: {
    data() {
      return this.$store.state.article.articleDetail
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  mounted() {

  },
  activated() {
    this.$nextTick(() => {

    })
    setTimeout(() => {
      var player = null
      const video = `http://qiniu.08tj.com/${this.data.videoKey}`
      const image = this.data.cover
      if (!player) {
        player = new DPlayer({
          element: document.getElementById('player'),
          screenshot: true,
          autoPlay:false,
          video: {
            url: video,
            pic: image,
            thumbnails: image
          }
        })
      } else {
        if (player.video.currentSrc !== video) {
          player.switchVideo({
            url: video,
            pic: image,
            type: 'auto'
          })
        }
      }
    }, 500);
  }
}
</script>
<style scoped lang="less">
#player {
  width: 100%;
  height: auto;
}
.detail-page {
  background: #fff;
  overflow: hidden;
}
.mint-popup-1 {
  width: 200px;
  padding: 10px;
  top: 130px;
  right: 0px;
  h1 {
    font-size: 20px;
    color: #26a2ff;
  }
  p {
    margin-bottom: 10px;
  }
}
</style>
