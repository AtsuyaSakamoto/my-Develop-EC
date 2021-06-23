import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "firebase";

import VueAwesomeSwiper from 'vue-awesome-swiper' 
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD116FY6AOh-U1OsLt_V39Ek3YoLZfn6m8",
    authDomain: "my-ec-develop.firebaseapp.com",
    projectId: "my-ec-develop",
    storageBucket: "my-ec-develop.appspot.com",
    messagingSenderId: "1056233236023",
    appId: "1:1056233236023:web:c5dab02d76496a515141b2",
    measurementId: "G-RZKTSNJPPV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
