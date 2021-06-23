<template>
<div>
<v-layout row rap justify-center>
    <v-row justify="center">
        <v-col justify="center" align="center">
<ul class="list">
    <li v-for="(item) in items" :key="item.id">
     <p><img height="350px" width="400px" :src="'../'+item.image"></p>
     <p>{{item.name}}</p>
     <p>{{item.des}}</p>
     <p>1個：{{item.price}} 円</p>

<p id="red">数量を選択してください</p>
<span>数量：
</span>
<select v-model="value">
<option value="1">   1   </option>
<option value="2">   2   </option>
<option value="3">   3   </option>
<option value="4">   4   </option>
<option value="5">   5   </option>
<option value="6">   6   </option>
<option value="7">   7   </option>
<option value="8">   8   </option>
<option value="9">   9   </option>
<option value="10">   10   </option>
</select><br>
<h2>小計：{{item.price*value}}円（税抜）</h2>
<v-btn color="primary" type="submit" @click="addCart">カートに入れる</v-btn>
</li>
  </ul>
  </v-col>
  </v-row>
</v-layout>

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import Button from "@/components/Button.vue";
import {ItemData} from '@/types/index'

@Component({
  components:{
    Button
  },
 })
export default class ItemDes extends Vue {
  value=1
  user=this.$store.state.login_user

  created():void{
    this.$store.dispatch("fetchItem")
  }
  get items() :ItemData{
    return this.$store.state.items.filter((item:ItemData)=>item.id===Number(this.$route.params.id))
  }
  
  addCart():void{
    const cart=this.$store.state.cart
    const item = {
      id: new Date().getTime().toString(),
      status: 0,
      itemInfo: [{
        itemId: this.items[0].id,
        itemName:this.items[0].name,
        itemPrice:this.items[0].price,
        itemImage:this.items[0].image,
        // orderId:"",
        buyNum: this.value, 
      }]
    }
    if(confirm('カートに商品を追加しますか?')){
if(cart ===""){
      this.$store.dispatch("newCart",{user:this.user, item:item})
      
    }else{
      const copyCart = cart
      let info = [...copyCart.itemInfo, item.itemInfo[0]]
      let data = {
        id:cart.id,
        status:0,
        itemInfo:info
      }
      this.$store.dispatch("addCart",{user:this.user,data:data})
     
    }
    }
    
  }
  }
  
</script>

<style scoped>
.list{
  margin-top: 30px;
  list-style: none;
  text-align: center;
}
</style>
