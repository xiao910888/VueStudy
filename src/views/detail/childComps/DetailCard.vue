<template>
  <div v-if="Object.keys(shareInfo).length !== 0"  >
    <div class="detail-card" @click="hideCard"></div>
    <img :src="src" alt="" class="card">
    <vue-canvas-poster :widthPixels="1000"
                       :painting="painting"
                       @success="success"
                       @fail="fail"/>
  </div>
</template>

<script>
  export default {
    name: "DetailCard",
    props:{
      shareInfo:{
        type:Object,
        default(){
          return {}
        }
      },
    },
    data() {
      return {
        src: '',
        painting: {
          width: '550px',
          height: '876px',
          background: '#f8f8f8',
          views: [
            //shoplogo
            {
              type: 'image',
              url: '',
              css: {
                top: '20px',
                left: '36px',
                borderRadius: '100%',
                width: '80px',
                height: '80px',
                borderWidth: '6px',
                borderColor: '#fff'
              }
            },
            //shopname
            {
              type: 'text',
              text: '',
              css: {
                top: '48px',
                left: '136px',
                width: '360px',
                maxLines: 1,
                fontSize: '26px',
                fontWeight: '500'
              }
            },
            //whiterect,白色矩形
            {
              type: 'rect',
              css: {
                top: '120px',
                left: '12px',
                color: '#fff',
                width: '526px',
                height: '540px',
                borderRadius: '10px'
              }
            },
            //view[3-5],展示图
            {
              type: 'image',
              url: '',
              css: {
                top: '150px',
                left: '25px',
                width: '332px',
                height: '332px'
              }
            },
            {
              type: 'image',
              url: '',
              css: {
                top: '150px',
                left: '364px',
                width: '160px',
                height: '160px'
              }
            },
            {
              type: 'image',
              url: '',
              css: {
                top: '320px',
                left: '364px',
                width: '160px',
                height: '160px',
              }
            },
            //view[6],名称前的小标签
            {
              type: 'text',
              text: '',
              css: {
                top: '507px',
                left: '27px',
                fontSize: '22px',
                color: '#ffffff',
                padding: '3px 4px 3px 4px',
                borderRadius: '3px',
                background: 'rgba(255,87,119,1)',
                lineHeight: '28px'
              }
            },
            //view[7],商品名
            {
              type: 'text',
              text: '',
              css: {
                top: '507px',
                left: '25px',
                textIndent: '110px',
                color: '#333',
                fontSize: '24px',
                width: '500px',
                lineHeight: '40px',
                maxLines: 2
              }
            },
            //劲爆价
            {
              type: 'text',
              text: '劲爆价:',
              css: {
                top: '608px',
                left: '26px',
                color: '#666666',
                fontSize: '24px'
              }
            },
            //view[9],newPrice
            {
              id:'price',
              type: 'text',
              text: '',
              css: {
                top: '601px',
                left: '116px',
                color: '#ff5777',
                fontSize: '40px',
                fontWeight: 'bold'
              }
            },
            //view[10],oldPrice
            {
              type: 'text',
              text: '',
              css: {
                top: '609px',
                left: ['130px', 'price'],
                color: '#999999',
                fontSize: '26px',
                fontWeight: 'bold',
                textDecoration: 'line-through'
              }
            },
            //小三角
            {
              type: 'rect',
              css: {
                top: '647px',
                left: '439px',
                color: '#fff',
                width: '28px',
                height: '28px',
                rotate: 45
              }
            },
            {
              type: 'text',
              text: '长按或扫描二维码',
              css: {
                fontSize: '18px',
                color: '#999999',
                bottom: '22px',
                left: '385px'
              }
            },
            // 左下角广告
            {
              type: 'image',
              url:'',
              css: {
                left: '26px',
                bottom: '22px',
                width: '218px',
                height: '24px'
              }
            },
            //view[14],qrcode
            {
              type: 'qrcode',
              content: 'https://github.com/sunniejs/vue-canvas-poster',
              css: {
                bottom: '50px',
                right: '26px',
                color: '#000',
                width: '130px',
                height: '130px'
              }
            }
          ]
        },
      }
    },
    methods: {
      success(src) {
        const view = this.painting.views
        const share = this.shareInfo
        view[0].url = share.logo
        view[1].text = share.shopname
        view[3].url = share.goodsImages[0]
        view[4].url = share.goodsImages[1]
        view[5].url = share.goodsImages[2]
        view[6].text = share.discount
        view[7].text = share.title
        view[9].text = share.newPrice
        view[10].text = share.oldPrice
        view[14].content = window.location.href
        this.src = src
      },
      fail(err) {
        console.log('fail', err)
      },
      hideCard(){
        this.$emit('hideCard')
      }
    },
  }
</script>

<style scoped>
  .detail-card{
    height: 100%;
    width: 100%;
    z-index: 10;
    position: absolute;
    top: 0px;
  }
  .card{
    width: 95%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid rgba(100,100,100,0.2);
    border-radius: 20px;
    z-index: 11;
  }
</style>
