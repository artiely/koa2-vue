<template>
  <div>
    <div v-for="(i,k) in list" :key="k" class="article-top" @click="toDetail(i)">
      <h3 class="tit">{{i.title}}</h3>
      <div class="clearfix"><span class="user-icon fl"><img :src="i.avatar" alt=""></span> <span v-if="i.author" class="author fl">{{i.author}}</span>
       <span class="create-time fr" v-if="i.create_time">{{i.create_time}}</span>
      </div>
      <p class="des" >{{i._des}}</p>
      <p class="info">
        <span class="crumbs"><span class="tag" v-for="tag in i.tags" :key="tag">{{tag}}</span></span>
       </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'article-item',
  data() {
    return {}
  },
  props: {
    data: {
      type: [Array, Object]
    },
    num: {
      type: Number,
      default: 20
    }
  },
  computed: {
    list() {
      function delHtmlTag(str) {
        return str.replace(/<[^>]+>/g, '') // 去掉所有的html标记
      }
      return this.data.map(v => {
        var newstr = delHtmlTag(v.content)
        newstr = newstr.replace(/&nbsp;/g, '')
        v._des = newstr === '' ? '点击查看详情' : newstr
        var str = v._des
        str = str.replace(/\s+width="[^"]*"/ig, '')
        v._des = str.replace(/\s+height="[^"]*"/ig, '')
        return v
      })
    }
  },
  watch: {},
  created() {
  },
  methods: {
    toDetail(i, event) {
      this.$emit('to-detail', i, event)
    }
  },
  mounted() {
    this.$nextTick(() => { })
  }
}
</script>
<style scoped lang="less">
@import '../../assets/style/mixin.less';
.article-top {
  padding: 16px 8px;
  background: #fff;
  box-shadow: 1px 1px 6px rgba(175, 236, 223, 0.2);
  border-radius: 4px;
  margin: 10px auto;
  line-height: 1.5;
  .tag {
    background: #eee;
    padding: 2px 4px;
    margin-right: 4px;
    margin-bottom: 4px;
    display: inline-block;
  }
  .create-time {
    float: right;
    color: #999;
  }
  .user-icon {
    display: inline-block;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    overflow: hidden;
    background: #ddd;
    margin-right: 6px;
    img {
      width: 100%;
    }
  }
  .author {
    font-size: 12px;
    color: #777;
    line-height: 16px;
  }
  .tit {
    font-size: 14px;
    color: #555;
    margin: 0;
    padding-bottom: 4px;
    .textover1;
  }
  .des {
    font-size: 12px;
    color: #777;
    margin: 6px 0;
    .textover2;
  }
  .info {
    font-size: 10px;
    color: #999999;
    margin: 0;
    .clearfix;
    .crumbs {
      float: left;
    }
  }
}
</style>
