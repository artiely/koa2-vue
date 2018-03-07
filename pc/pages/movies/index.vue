<template>
    <div>
      <el-card>
          <el-row :gutter="10">
        <el-col :xs="24" :sm="8" :md="6" v-for="o in data" :key="o._id">
          <el-card :body-style="{ padding: '0px' }" class="card-box" >
        <div class="img-box" @click="playvideo(o)">
          <img v-lazy="o.poster" class="image">
        </div>
        <div style="padding: 14px;">
          <span class="textover2">{{o.title}}</span>
          <div class="bottom clearfix">
            <!-- <time class="time">{{ currentDate }}</time> -->
            <el-button type="text" class="button">查看详情</el-button>
          </div>
        </div>
      </el-card>
        </el-col>
      </el-row>
       <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="count">
      </el-pagination>
      </el-card>
      
      <el-dialog :visible.sync="dialogVisible" :title="title" width="50%" >
        <div id="player1" ref="player"></div>
      </el-dialog>
    </div>
</template>

<script>
import '~/node_modules/dplayer/dist/DPlayer.min.css'
// import axios from 'axios'
import api from '~/api/api'
export default {
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      title:''
    }
  },
  async asyncData(){
    let res =  await api.GET_MOVIES({page:1,limit:8})
  //  let res =  await axios.get('/api/v0/movies/1/8')
    return {
        data: res.data,
        count:res.count
      }
  },
  methods: {
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      let res = await axios.get(`/api/v0/movies/${val}/8`)
      this.data = res.data
      this.count = res.count
    },
    playvideo(data) {
      this.dialogVisible = true
      this.title = data.title
      setTimeout(() => {
        var player = null
        const video = `http://qiniu.08tj.com/${data.videoKey}`
        const image = `http://qiniu.08tj.com/${data.coverKey}` 
        if (!player) {
          player = new DPlayer({
            element: this.$refs.player,
            screenshot: true,
            autoPlay: false,
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
      }, 500)
    }
  },
  created() { }
}
</script>

<style>
.card-box {
  width: 100%;
  float: left;
  margin: 5px;
  height: 388px;
  overflow: hidden;
}
.img-box {
  height: 294px;
  overflow: hidden;
}
.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
