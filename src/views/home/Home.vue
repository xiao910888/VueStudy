<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll">
      <HomeSwiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <FeatureView/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick"/>
  </div>
</template>

<script>
  import HomeSwiper from "./CildComps/HomeSwiper";
  import RecommendView from "./CildComps/RecommendView";
  import FeatureView from "./CildComps/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      getHomeMultidata,
      getHomeGoods,

      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods: {
          'pop':{page: 0,list: []},
          'new':{page: 0,list: []},
          'sell':{page: 0,list: []},
        },
        currentType: 'pop'
        }
      },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听相关方法
       * */
      tabClick(index){
        this.currentType = Object.keys(this.goods)[index]
        //老师写了个switch
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },

      /**
       * 网络请求相关方法
       * */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          //this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page +1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page +=1
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 49px;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
/*  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }*/
</style>
