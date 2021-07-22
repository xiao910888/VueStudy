<template>
  <div class="wrapper" ref="aaaa">

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {backTopMixin} from "../../common/mixin";

  export default {
    name: "Category",
    mixins: [backTopMixin]

  }
</script>

<style scoped>
</style>
