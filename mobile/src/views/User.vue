<template>
  <div class="user">
    <mt-header fixed title="user"></mt-header>
    <div class="page-content">
      <mt-cell title="博主整理" is-link>
        <i-icon slot="icon" name="icon-zhinengyun" symbol></i-icon>
      </mt-cell>
      <mt-cell title="博主整理" is-link>
        <i-icon slot="icon" name="icon-zhinengyun" symbol></i-icon>
      </mt-cell>
      <p v-for="i in 20" :key="i">{{i}}user</p>
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
