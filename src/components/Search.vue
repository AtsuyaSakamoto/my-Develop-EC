<template>
<input type="text">
</template>

<script lang="ts">
import Vue from 'vue'
import {Prop,Component} from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop()
  placeholder?:string
 }
</script>