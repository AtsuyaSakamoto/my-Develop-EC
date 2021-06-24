<template>
<div>
<div v-if="goOrder" class="form">
  <div>
  <h2>注文内容確認</h2>
  <br>
  <br>
    <v-layout row rap justify-center>
    <v-row justify="center" >
<ul class="list">
    <li  v-for="(item,index) in (carts.itemInfo)" :key="index">
      <v-card class="card" max-width="250px" max-height="300px">
      <p><img height="120px" width="250px" :src="item.itemImage"></p>
      <v-spacer></v-spacer>
      <v-card-text> 
      <p>{{item.itemName}}</p> 
      <p>{{item.buyNum}}個</p> 
      <p>{{item.itemPrice*item.buyNum}}円</p> 
      <!-- {{index}} -->
      <!-- {{carts.orderId}} -->
      <p><v-btn color="error" small  @click="deleteCart(index)">商品を削除<v-icon>mdi-delete</v-icon></v-btn></p>
      </v-card-text>
      </v-card>
    </li>
  </ul>
  </v-row>
  </v-layout>
  <br>
  <br>
  <h3 v-show="totalPrice()">消費税： {{Math.round(totalZei()).toLocaleString()}} 円</h3> 
  <h3 v-show="totalPrice">合計金額： {{Math.round(totalPrice()).toLocaleString()}} 円(税込)</h3>

<br>
<br>

<v-btn color="primary" @click="go">注文に進む</v-btn>
  <div v-show="order"><Order/></div>
  </div>
  </div>
  <div v-else class="form">
    <h2>カートが空です</h2>
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
  order=false
  // carts=this.$store.state.cart
  go():void{
    this.order=!this.order
  }
  get goOrder():boolean{
    if(this.$store.state.cart===null||this.$store.state.cart.itemInfo.length===0){
     return false
    }else{
      return true
    }
  }
  
  user=this.$store.state.login_user
  get carts():CartItems{
   return this.$store.state.cart
  }
  
  deleteCart(index):void{
    if(confirm("カートを削除してよろしいですか?")){

      console.log("でりーとかーと")
      let copy=this.$store.state.cart
      copy.itemInfo.splice(index,1)
      console.log(copy)
    this.$store.dispatch("deleteCart",copy)
    // console.log(copy)
    }
  }
  totalPrice():number{
    let total=0
    if(this.carts!==null){
      this.carts.itemInfo.forEach(item=>{
        total+=total+item.itemPrice*item.buyNum
        })
        total=total*1.1
        return total
        }
        }
  totalZei():number{
    let total=0
    if(this.carts!==null){
      this.carts.itemInfo.forEach(item=>{
        total+=total+item.itemPrice*item.buyNum
        })
        total=total*0.1
        return total
        }
        }

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