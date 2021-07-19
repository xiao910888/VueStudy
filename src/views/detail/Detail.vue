<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages" ref="goods"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" />
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "../../common/utils";

  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail";
  import {itemListenMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      debounce,
      getDetail,
      getRecommend,
      Goods,
      Shop,
      GoodsParam,
    },
    mixin: [itemListenMixin],
    data(){
      return{
        iid:null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
        themeTops: [],
        currentIndex:0
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.id

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        const data =res.result
        this.topImages = data.itemInfo.topImages
        console.log(res)

        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //有点商品没有评论信息
        if(data.rate.cRate !== 0)
         this.commentInfo = data.rate.list[0]
      })

      //3.请求推荐数据
      getRecommend(this.iid).then(res =>{
        this.recommends = res.data.list
      })
    },
    methods: {
      titleClick(index){
        switch (index) {
          case 0:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.goods.$el,300);break;
          case 1:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.param.$el,300);break;
          case 2:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.comment.$el,300);break;
          case 3:
            this.$refs.scroll.scroll.scrollToElement(this.$refs.recommend.$el,300);break;
        }
      },
      contentScroll(position){
        for(let i=0 ;i< this.themeTops.length;i++){
          if(this.themeTops[i]<=-position.y+44 && -position.y+44<this.themeTops[i+1])
            this.currentIndex = i
          console.log(this.currentIndex)
        }
        this.$refs.nav.currentIndex=this.currentIndex
      }
    },
    mounted(){
      this.refresh = debounce(this.$refs.scroll.refresh,50)
      //3.监听item中图片加载完成
      this.$bus.$on('detailImageLoad',() =>{
        this.refresh()
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 44px);
    /*overflow: hidden;*/
  }
</style>
