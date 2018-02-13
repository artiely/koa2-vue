<template>
  <div class="user">
    <mt-header fixed title="user"></mt-header>
    <div class="page-content">
      <div class="userinfo">
        <div class="avatar">
          <img src="../assets/logo.png" alt="">
        </div>
        <div class="info">
          <h3 class="nikiname">Artiely</h3>
          <p class="user-des">人生除了裆下的苟且，还有未知的bug和看不懂的code</p>
        </div>
      </div>
      <mt-cell is-link class="one">
        <i-icon slot="icon" name="icon-jiaoliu" symbol></i-icon>
        <span slot="title" class="user-cell-tit"> 意见反馈</span>
      </mt-cell>
      <mt-cell  is-link>
        <i-icon slot="icon" name="icon-zhinengyun" symbol></i-icon>
        <span slot="title" class="user-cell-tit"> 意见反馈</span>
      </mt-cell>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'user',
  data() {
    return {}
  }
}
</script>
<style lang="less">
.user {
  .user-cell-tit {
    font-size: 14px;
  }
}

.userinfo {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 8px;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    margin-top: 4px;
    box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .info {
    padding-left: 8px;
    flex: 1;
    .nikiname {
      padding: 0;
      margin: 0;
      line-height: 1.5;
      font-size: 18px;
    }
    .user-des {
      margin: 0;
      line-height: 2;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
