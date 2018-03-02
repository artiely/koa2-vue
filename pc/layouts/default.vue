<template>
  <div class="hello">
    <el-container>
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="deftultActive" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <div slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">充电</span>
          </div>
          <el-menu-item-group>
            <span slot="title">学习</span>
            <el-menu-item index="article">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">娱乐</span>
            <el-menu-item index="movies">电影预告</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-container>
        <el-header>
          <span class="icon-expand" @click="changeCollapse"><i class="iconfont icon-xuanxiang"></i></span>
        </el-header>
        <el-main>
          <nuxt />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        deftultActive:'movies'
      }
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    watch:{
      '$route':{
        handler(val) {
          console.log('改变了',val)
          this.deftultActive = val.name
        }
      }
    },
    created() {
      this.deftultActive = this.$route.name
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .icon-expand {
    float: left;
    height: 60px;
    width: 60px;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
  }
  .icon-expand i {
    font-size: 24px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    text-align: left;
    position: relative;
    border-right: none;
    min-height: 100vh;
    padding-top: 60px;
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .el-menu-vertical-demo.el-menu--collapse {
    position: relative;
    border-right: none;
    min-height: 100vh;
    padding-top: 60px;
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .el-menu {
    border-right: none;
    z-index: 10;
  }
  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
  }
  .el-main {
    background-color: #f0f2f5;
    color: #333;
    text-align: left;
    height: 100%;
    min-height: 100vh;
  }
  body>.el-container {
    margin-bottom: 40px;
  }
</style>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
