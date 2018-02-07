<template>
  <div class="chat">
    <mt-header fixed title="chat"></mt-header>
    <div class="page-content">
      <p v-for="i in 20" :key="i">{{i}}chat</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
    }
  }
}
</script>
