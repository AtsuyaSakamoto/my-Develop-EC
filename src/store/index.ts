import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";
import {ItemData} from '@/types/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    login_user:null,
    cart:"" ,
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
      // const index=state.cart.findIndex((item)=>item.id===id)
      state.cart=data
      state.orderId=data.orderId
    },
    cartSet(state,{orderId,cart}){
     state.cart=cart
     state.orderId=orderId
    },
    deleteCart(state,{id}){
      //  const cartitem=state.cart
      // const sakujo=cartitem.findIndex(item=>item.orderInfo===id)
      // cartitem.splice(index,1)
      // console.log("sss")
      // console.log(state.cart[0])
      // console.log(id)
      state.cart=""
    },
    buyItem(state,{rireki}){
      state.rireki.push(state.cart)
      console.log(state.cart)
      state.cart=""
      // console.log(state.cart)
      // console.log(state.rireki)
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
        deleteCart({ getters, commit },{id}) {
          if (getters.uid) {
             firebase
              .firestore()
              .collection(`users/${getters.uid}/orders`)
              .doc(id)
              .delete()
              .then(() => {
                commit("deleteCart",{id});
                console.log(this.state.cart)
                console.log(id)
              
              });
          }
        },
      buyItem(rireki){
        this.commit("buyItem",{rireki})
      }
        },
      
    getters: {
    uid: (state) => (state.login_user ? state.login_user.uid : null),
    orderId:(state)=>(state.orderId ? state.orderId: ""),
    cartItem:(state)=>(state.cart ? state.cart: ""),
    userName: (state) => (state.login_user ? state.login_user.displayName : ""),
  }
})
