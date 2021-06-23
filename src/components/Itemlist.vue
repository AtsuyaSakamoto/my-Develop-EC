<template>
  <ul class="list">
    <li  v-for="(item) in getItem" :key="item.id">
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
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';


@Component({
  created(){
    this.$store.dispatch("fetchItem")
  },
  computed:{
    getItem(){
      return this.$store.state.items
    }
  }
})
export default class Itemlist extends Vue {

}
</script>

<style scoped>
.list{
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  /* width: 30%; */
}
.card{
  margin-top: 30px;
}

</style>