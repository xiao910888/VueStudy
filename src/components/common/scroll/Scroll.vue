<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeDOM: true,
        observeImage:true
      })

      //2.监听滚动的位置,并返回调用父组件函数，传参position
      if(this.probeType ===2 || this.probeType===3){
        this.scroll.on('scroll',(position) =>{
          this.$emit('scroll',position)
        })
      }

      //3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() =>{
          console.log('拉了一次')
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
       // console.log('结束pullup')
          this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
      //  console.log('------')
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
