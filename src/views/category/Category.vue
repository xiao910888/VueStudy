<template>
  <div class="wrapper" ref="aaaa">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll:null
      }
    },
    //组件创建完后调用
    created() {
    },
    mounted() {
      // console.log(this.$refs.aaaa);
      // console.log(document.querySelector('.wrapper'))

      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,
        pullUpLoad:true
      })

      this.scroll.on('scroll',(position) =>{
       // console.log(position);
      })

      this.scroll.on('pullingUp',() =>{
        console.log('上拉加载更多')
        setTimeout(()=>{
          this.scroll.finishedPullUp()
        },2000)
      })
    },
    methods:{
      btnClick(){
        console.log('btnClick');
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
