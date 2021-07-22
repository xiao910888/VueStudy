<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    props:{
    },
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods:{
      show(message='默认文字',time=2000){
        this.isShow = true;
        this.message = message
        setTimeout(() =>{
          this.isShow = false;
          this.message = ''
        },time)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 8px 12px;
    background-color: rgba(0,0,0,.8);
    color: #fff;
    z-index: 999;
  }
</style>
