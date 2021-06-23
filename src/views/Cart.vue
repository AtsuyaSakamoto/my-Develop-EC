<template>
<div class="form">
  <div>
  <h2>注文内容確認</h2>
  <br>
  <br>
    <v-layout row rap justify-center>
    <v-row justify="center" >
<ul class="list">
    <li  v-for="(item) in (carts.itemInfo)" :key="item.id">
      <v-card class="card" max-width="250px" max-height="300px">
      <p><img height="120px" width="250px" :src="item.itemImage"></p>
      <v-spacer></v-spacer>
      <v-card-text> 
      <p>{{item.itemName}}</p> 
      <p>{{item.buyNum}}個</p> 
      <p>{{item.itemPrice*item.buyNum}}円</p> 
      {{carts.orderId}}
      </v-card-text>
      </v-card>
    </li>
  </ul>
  </v-row>
  </v-layout>
  <!-- <h3 v-show="totalPrice()">消費税： {{Math.round(totalPrice()*0.1)}} 円</h3>
  <h3 v-show="totalPrice()">合計金額： {{Math.round(totalPrice()*1.1)}} 円(税込)</h3> -->

<br>
<br>
<p><v-btn color="error" small  @click="deleteCart(carts.orderId)">カートを削除<v-icon>mdi-delete</v-icon></v-btn></p>

<!-- <p>カート{{carts}}</p> -->
<v-btn color="primary" @click="goOrder">注文に進む</v-btn>
  <div v-show="order"><Order/></div>
  </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import Order from "@/components/Order.vue";
import {CartItems} from '@/types/index'


@Component({
  components:{
    Order
  },
  //  created(){
  //   this.$store.dispatch("cartSet")
  // },
 
})
export default class Cart extends Vue{
  total=0
  order=false
  carts=this.$store.state.cart
  goOrder():void{
    this.order=!this.order 
  }
  user=this.$store.state.login_user
  // get carts():CartItems{
  //  return this.$store.state.cart
  // }
  
  deleteCart(id):void{
    if(confirm("カートを削除してよろしいですか?")){

      console.log("でりーとかーと")
    this.$store.dispatch("deleteCart",{id})
    }
  }
  // totalPrice():number{
  //   if(this.carts!==""){
  //   this.total=0
  //   this.carts.itemInfo.forEach(item=>{
  //   this.total=(this.total+item.itemPrice*item.buyNum)
  //   })
  //     return this.total
  //     }
  // }

}
</script>

<style scoped>
.form{
  margin-top: 30px;
  text-align: center;
}
.list{
  list-style: none;
}
</style>