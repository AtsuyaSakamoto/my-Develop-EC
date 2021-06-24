import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";
import {ItemData} from '@/types/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    login_user:null,
    cart:null ,
    orderId:"",
    rireki:[]
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    fetchItem(state,itemArray){
      state.items=itemArray
    },
    newCart(state,{item}){
      state.cart=item
      state.orderId=item.orderId
    },
    addCart(state,{data}){
      state.cart=data
      state.orderId=data.orderId
    },
    cartSet(state,{orderId,cart}){
     state.cart=cart
     state.orderId=orderId
    },
    deleteCart(state,copy){
      state.cart=copy
    },
    buyItem(state){
      state.cart=null
    },
    getRireki(state,rireki){
      state.rireki=rireki
    }
      
    
  },
  actions: {
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    fetchItem({commit}){
      firebase.firestore().collection(`items`).get().then(snapshot=>{
        const  itemArray:ItemData[]=[]
        snapshot.forEach(item=>{
          const itemData=item.data()
          itemArray.push(itemData)
        })
        commit("fetchItem",itemArray)
      })
    },

    newCart({ getters, commit }, {item}) {
      if (getters.uid) {
         firebase
          .firestore()
          .collection(`users/${getters.uid}/orders`)
          .add(item)
          .then((doc) => {
            item.orderId=doc.id
            commit("newCart",{item});
            // console.log("にゅーカート")
          });
      }
    },
   
        addCart({ getters, commit }, {data}) {
          if (getters.uid) {
             firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .doc(getters.orderId)
              .update(data)
              .then(() => {
                data.orderId=getters.orderId
                commit("addCart",{data});
                // console.log("あどカート")
                // console.log(this.state.cart)
              });
          }
        },
        cartSet({ getters, commit }) {
          if (getters.uid) {
             firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .get()
              .then(snapshot=>{
                const cart=[]
                snapshot.forEach(doc=>{
                  if(doc.data().status===0){
                    console.log(doc.id)
                    cart.push(doc.data())
                    commit("cartSet",{orederId:doc.id,cart:cart})
                  }
                })
                // console.log("せっとかーと")
                // console.log(this.state.cart)
              })
          }
        },
        deleteCart({ getters, commit },copy) {
          console.log("あく")
          if (getters.uid) {
            // console.log(copy)
             firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .doc(getters.orderId)
              .update(copy)
              .then(() => {
                commit("deleteCart",copy);
                console.log(copy)
              });
          }
        },
      buyItem({ getters, commit }, bought){
        firebase
        .firestore()
        .collection(`users/${getters.uid}/orders`)
        .doc(getters.orderId)
        .update(bought)
        .then(() => {
          // console.log(bought)
          commit("buyItem");
          console.log()
      });
    },
    getRireki({ getters, commit }){
      const rireki=[]
      firebase
      .firestore()
      .collection(`users/${getters.uid}/orders`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc=>{
          // console.log(doc.data())
          if(doc.data().status===0){
             rireki.push(doc.data())
          }
        })
        commit("getRireki",rireki);
        console.log(rireki)
    });
  },
  },
    getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    orderId:(state)=>(state.orderId ? state.orderId: ""),
    cartItem:(state)=>(state.cart ? state.cart.itemInfo: ""),
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
  }
})
