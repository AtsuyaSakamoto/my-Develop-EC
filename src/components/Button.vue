<template>
<v-btn
      depressed
      color="primary"
      height="28"
    >
      {{text}}
    </v-btn>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

  @Component
export default class Button extends Vue {
  @Prop({default:'ボタン'})
  text?:string|number
  }
</script>