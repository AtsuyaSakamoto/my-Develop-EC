<template>
<div class="rireki">
  <br>
<h2>購入履歴</h2>
<br>
<br>
<br>
<v-layout row rap justify-center>
    <v-row justify="center" >
<ul class="list">
    <div v-for="(item) in (rireki)" :key="item.id">
    <li v-for="(innerItem) in (item.itemInfo)" :key="innerItem.id">
    <!-- <li v-for="(it) in (item)" :key="it.id"> -->
      <v-card class="card" max-width="250px" max-height="300px">
      <p><img height="120px" width="250px" :src="innerItem.itemImage"></p>
      <v-spacer></v-spacer>
      <v-card-text> 
      <p>{{innerItem.itemName}}</p> 
      <p>{{innerItem.buyNum}}個</p> 
      <p>{{innerItem.itemPrice*innerItem.buyNum}}円</p> 
      </v-card-text>
      </v-card>
    </li>
    </div>
  </ul>
  </v-row>
  </v-layout>
  <br>
  <br>
<!-- {{rireki}} -->
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
// import {CartItems} from '@/types/index'

@Component({
  created(){
    this.$store.dispatch("getRireki")
    // console.log(this.$store.state.rireki)
  },
})
export default class Rireki extends Vue{
  get rireki():any{
   return this.$store.state.rireki
  }
}
</script>

<style scoped>
.rireki{
  text-align: center;
  margin-top: 30px;
}
.list{
  list-style: none;
}
</style>