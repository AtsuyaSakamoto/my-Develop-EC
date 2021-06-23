<template> 
<div>
  <swiper> 
      <swiper-slide>Slide 1</swiper-slide> 
      <swiper-slide>Slide 2</swiper-slide> 
      <swiper-slide>Slide 3</swiper-slide> 
      <swiper-slide>Slide 4</swiper-slide> 
      <swiper-slide>Slide 5</swiper-slide> 
      <swiper-slide>Slide 6</swiper-slide> 
      <swiper-slide>Slide 7</swiper-slide> 
      <swiper-slide>Slide 8</swiper-slide> 
      <swiper-slide>Slide 9</swiper-slide> 
      <swiper-slide>Slide 10</swiper-slide> 
  </swiper> 
</div>
</template> 

<style>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    height: 120px;
    text-align: center;
    font-size: 18px;
    background: #ccc;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

@Component
export default class Swiper extends Vue{
}
</script>
