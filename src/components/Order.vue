<template>
<div class="form">
  <h2>注文フォーム</h2>
  <h3>お届け先情報</h3>
  <v-container text-xs-center>
     <v-layout row wrap justify-center>
        <v-flex xs3 mt-3>
          <v-form ref="form" v-model="valid" lazy-validation>
  <table>
    <tbody>
      <tr>
        <td>お名前：</td>
        <td> 
          <v-text-field
          placeholder="山田太郎"
          color="green darken-5"
          clearable
          maxlength="12"
          v-model="userName"
          :rules="nameRules"
          ></v-text-field>
       </td>
      </tr>
      <tr>
      <td>メールアドレス：</td>
      <td><v-text-field
          placeholder="sample@mail.com"
          color="green darken-5"
          clearable
          maxlength="12"
          v-model="userMail"
          :rules="emailRules"
        ></v-text-field></td>
      </tr>
      <tr>
      <td>郵便番号：</td>
      <td><v-text-field
          placeholder="000-0000"
          color="green darken-5"
          clearable
          maxlength="12"
          v-model="userDestinationZipcode"
          :rules="zipRules"
        ></v-text-field></td>
      <td></td>
      </tr>
      <tr>
        <td>住所：</td>
        <td><v-text-field
          placeholder="東京都×××区××1丁目"
          color="green darken-5"
          clearable
          maxlength="12"
          v-model="userAddress"
          :rules="addressRules"
        ></v-text-field></td>
      </tr>
      <tr>
        <td>配達日時：</td>
        <td><input type="date" v-model="userDate" :rules="dateRules">
        </td>
      </tr>

    </tbody>
  </table>
  </v-form>
  </v-flex>
  </v-layout>
</v-container>
<br>
  <h3>お支払い方法</h3>
  <p><input type="radio" name="pay" value=1 v-model="value" >代金引換
  <input type="radio" name="pay" value=2 v-model="value">クレジットカード</p>
  <!-- <button @click="kakunin">注文</button> -->
  <v-btn color="primary" @click="buyItem()">注文</v-btn>
 
</div>
  
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';


@Component
export default class Order extends Vue{
userName=""
userMail=""
userDestinationZipcode=""
userAddress=""
userDate=""
value=0

valid= true
nameRules= [(v) => !!v || "名前を入力してください"]
emailRules= [
        (v) => !!v || "メールアドレスを入力してください",
        (v) =>
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
            v
          ) || "メールアドレスの形式が不正です",
      ]
zipRules= [
        (v) => !!v || "郵便番号を入力してください",
        (v) =>
          /^\d{3}-\d{4}$/.test(v) ||
          "郵便番号はXXX-XXXXの形式で入力してください",
      ]
addressRules= [v => !!v || "住所を入力してください"]
dateRules=[v=> !!v || '配達日を入力してください',]
// payRules=[(v) => !!v || "お支払い方法を選択してください"]

buyItem():void{
  // eslint-disable-next-line
  if((this.$refs as any).form.validate()){

    const bought=
  {
    status:Number(this.value),
    orderId:this.$store.getters.orderId,
    itemInfo:this.$store.getters.cartItem,
    userInfo: [{
      name:this.userName,
    mail:this.userMail,
    destinationZipcode:this.userDestinationZipcode,
    address:this.userAddress,
    date:this.userDate
    }]
}
  if(confirm("購入しますか?")){
    console.log("発火してる")
 this.$store.dispatch("buyItem",bought)
 this.$router.push({name:'Finish'})
 console.log(this.emailRules)
  }
    }else{
      console.log("失敗")
    }
}
}
</script>

<style scoped>
.form{
  text-align: center;
}
</style>
