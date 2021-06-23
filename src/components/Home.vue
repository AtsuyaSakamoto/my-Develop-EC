<template>
<div class="main">
<!-- <Swiper/> -->
 <!-- <p class="kensaku"><Search v-model="value"/> -->
 <p class="kensaku">
   <input type="text" v-model="value" placeholder="search menu">
 <!-- <Button text="検索"/> -->
 <!-- <button @click="search()">検索</button>｜ -->
 <v-btn rounded @click="clear()"><v-icon>mdi-delete</v-icon></v-btn>
 <!-- <p class="list"><Itemlist/></p> -->
 </p>
 
 <ul class="list">
    <li  v-for="(item) in search()" :key="item.id">
      <v-card class="card" max-width="250px" max-height="300px">
      <p><v-img height="150px" width="250px" :src="item.image" @click="$router.push({name:'ItemDes',params:{id:item.id}})"></v-img></p>
      <v-spacer></v-spacer>
      <v-card-text>
      <p @click="$router.push({name:'ItemDes',params:{id:item.id}})">{{item.name}}</p>
      <p>{{item.price}}円</p>
      </v-card-text>
      </v-card>
    </li>
  </ul>

   
</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component} from 'vue-property-decorator';
  import Button from "@/components/Button.vue";
  import Search from "@/components/Search.vue";
  import Itemlist from "@/components/Itemlist.vue";
  import Swiper from "@/components/Swiper.vue";
  import {ItemData} from '@/types/index'
  
  @Component({
    components:{
      Button,
      Search,
      Itemlist,
      Swiper
    },
    created(){
    this.$store.dispatch("fetchItem")
  },
  computed:{
    getItem(){
      return this.$store.state.items
    },
    
  },
  })
 export default class Home extends Vue{
    value=""
    copy=[...this.$store.state.items]
    search():ItemData[]{
      const searchitem=[]
      this.$store.state.items.filter((item:ItemData)=>{
        if(0 <= item.name.indexOf(this.value)){
        //  console.log(this.value)
          searchitem.push(item)
        }
      })
    
      return searchitem
    }
    clear():ItemData[]{
      this.value=""
       return this.$store.state.items 
    }
 }
</script>

<style scoped>
.kensaku{
  text-align: center;
  margin-top: 30px;
}
.list{
  text-align: center;
  margin: 50px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.card{
  margin-top: 30px;
}


</style>