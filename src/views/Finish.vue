<template>
<div>
  <h2>注文内容が送信されました</h2>
  <p>この度はご注文ありがとうございます</p>
  <!-- <p>※5秒後に自動でトップページに戻ります</p> -->
<button @click="$router.push({name:'Home'})">トップページ へ戻る</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class OrderFinish extends Vue{
}
</script>