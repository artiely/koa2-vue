<template>
  <div>
    <el-card>
      <div>
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="日期" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <div slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </div>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
    </el-card>
    
    <el-dialog :visible.sync="dialogVisible" :title="article.title" width="50%">
      <div class="page-content">
        <div class="detail-page">
          <main class="container main-container">
            <div class="book-section-view">
              <h1>{{article.title}}</h1>
              <div v-html="article.content"></div>
              <div class="tags-wrapper"><span class="detail-tag" v-for="tag in article.tags" :key="tag">{{tag}}</span></div>
            </div>
          </main>
          <div class="author-info">
            <span class="author-icon">
                  <img :src="article.avatar" alt="">
                </span>
            <span class="author-name">{{article.author}}</span>
            <span class="create-time">{{article.create_time}}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
  },
  data() {
    return {
      dialogVisible: false,
      data: [],
      article: {
        author: "",
        avatar: "",
        content: "",
        create_time: "",
        meta: {
          updateAt: "2018-02-09T05:06:21.632Z",
          createAt: "2018-02-09T05:06:21.632Z"
        },
        tags: [],
        title: "",
      }
    }
  },
  async asyncData() {
    let res = await axios.get('http://localhost:3001/api/v0/juejin/1/10')
    return {
      data: res.data.data
    }
  },
  methods: {
    handleClick(data) {
      this.dialogVisible = true
      this.article = data
    }
  },
  created() { }
}
</script>

<style lang='less'>
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
.author-info {
  border-top: 1px solid #eee;
  padding: 8px;
  .author-icon {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .author-name {
    font-size: 14px;
    vertical-align: top;
  }
  .create-time {
    font-size: 12px;
    color: #999;
    vertical-align: super;
  }
}
.tags-wrapper {
  width: 100%;
  overflow: hidden;
}
.detail-tag {
  background: #eee;
  padding: 4px 6px;
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 6px;
  white-space: nowrap;
}
</style>
