<template>
  <div class="login">
    <!-- <mt-header fixed title="login"></mt-header> -->
    <div class="page-content">
      <Logo></Logo>
      <mt-field placeholder="邮箱/手机号" state="success" v-model="username"></mt-field>
      <mt-field placeholder="密码" state="error" v-model="password" type="password"></mt-field>
      <t-button @click.native="login">登录</t-button>
      <p @click="toRegister" class="help">注册</p>
    </div>
  </div>
</template>
<script>
import TButton from '@/components/button/TButton'
import Logo from '@/components/logo/Logo'
export default {
  name: 'login',
  components: {
    TButton,
    Logo
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$router.push('/index')
    }
  }
}
</script>
<style scoped>
.login {
  background: #fff;
}
</style>
