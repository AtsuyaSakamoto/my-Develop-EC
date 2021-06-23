<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >

      <div class="d-flex align-center">
        <v-img
          alt="header_logo.png"
          class="shrink mr-2"
          contain
          src="./assets/images/header.png"
          transition="scale-transition"
          width="150"
          @click="$router.push({name:'Home'},()=>{})"
        />
      </div>

      <div id="menu" >
        <!-- <button @click="this.$router.push('/cart')>押して</button> -->
        <button @click="$router.push({name:'Home'},()=>{})"><v-icon>mdi-menu</v-icon><br>商品一覧</button>｜
        <button @click="$router.push({name:'Cart'},()=>{})"><v-icon>mdi-cart</v-icon><br>カート</button>｜
        <button @click="$router.push({name:'Rireki'},()=>{})"><v-icon>mdi-file</v-icon><br>購入履歴</button>｜
       
      </div>
      <div class="name">
        <button v-show="!$store.state.login_user" @click="login">ログイン</button> 
        <button v-show="$store.state.login_user" @click="logout">ログアウト</button> ｜
        <span v-show="$store.state.login_user">ユーザー名：{{userName}}</span>
      </div>

      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Home from "@/components/Home.vue";
import {mapActions,mapGetters} from "vuex"
import firebase from "firebase"

@Component({
  components:{
    Home,
  },
  methods:{
    ...mapActions(["login","setLoginUser","logout","deleteLoginUser"])
  },  
 created(){
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
         this.setLoginUser(user)
        }else{
          this.deleteLoginUser()
        }
      })
      
    },
    computed:{
    ...mapGetters(["userName"])
  }
})
export default class App extends Vue{

}
</script>

