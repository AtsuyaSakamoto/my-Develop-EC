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
    <li v-for="(item) in (allCart)" :key="item.id">
    <!-- <li v-for="(it) in (item)" :key="it.id"> -->
      <v-card class="card" max-width="250px" max-height="300px">
      <p><img height="120px" width="250px" :src="item.itemInfo[0].itemImage"></p>
      <v-spacer></v-spacer>
      <v-card-text> 
      <p>{{item.itemInfo[0].itemName}}</p> 
      <p>{{item.itemInfo[0].buyNum}}個</p> 
      <p>{{item.itemInfo[0].itemPrice*item.itemInfo[0].buyNum}}円</p> 
      </v-card-text>
      </v-card>
    </li>
  </ul>
  </v-row>
  </v-layout>
  <br>
  <br>
<p>{{allCart[0]}}</p>

</div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import {CartItems} from '@/types/index'

@Component
export default class Rireki extends Vue{
  carts=this.$store.state.cart
  rirekiCart():CartItems[]{
    console.log(this.carts)
     const rireki=[]
     this.carts.filter((cart:CartItems)=>{
       if(cart.status !== 0){
         rireki.push(cart)
       }
     })
     console.log(rireki)
     return rireki
  }
  allCart=this.$store.state.rireki
}
</script>

<style scoped>
.list{
  list-style: none;
  text-align: center;
}
.rireki{
  text-align: center;
}
</style>