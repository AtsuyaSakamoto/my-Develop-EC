<template>
<div class="login">
  <h2>ログインして下さい</h2>
  <br>
  <p><button @click="$router.push({name:'Home'})">ホームへ戻る</button></p>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

  @Component
export default class Login extends Vue {
  }
</script>

<style scoped>
.login{
  text-align: center;
  margin-top: 30px;
}
</style>