<template>
  <div class="rule-chart">
    <div class="rule-content">
      <div class="rule-spread"><div class="rule-center"></div></div>
      <div v-for="(item, index) in data" :key="index" :class="{'rule-card': true, ['card'+(index+1)]: true, 'active': activeKey === index+1}">
        <div class='card-l'>
          <div class="title">{{item.mxmc}}</div>
          <div class="num">{{item.mxgs}}<span>个</span></div>
        </div>
        <div class='card-r'>
          <div class="title">调用</div>
          <div class="num">{{item.dycs}}<span>次</span></div>
        </div>
        <div class="line"></div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      timer1: null,
      activeKey: 1,
      data: []
    };
  },
  mounted () {
    this.setActiveKey()
    this.getData()
    this.timer1 = setInterval(() => {
      setTimeout(this.getData, 0)
    }, 5000)
  },
  methods: {
    setActiveKey(){
      this.timer = setInterval(()=>{
        this.activeKey ++ 
        if(this.activeKey>5){
          this.activeKey = 1
        }
      },800)
    },
    getData () {
      this.axios.get('/api/p3/modelInfo')
      .then( (res)  => {
         const { data } = res.data
         this.data = data
      })
      .catch(function (error) {
          console.log(error);
      });
    },
  },
  beforeDestroy () {
    clearInterval(this.timer)  
    this.timer = null
    clearInterval(this.timer1)
    this.timer1 = null
  }
};
</script>

<style lang="less" scoped>
.rule-chart{
  width: 100%;
  height: 20%;
  .rule-content{
    width: 100%;
    position: relative;
    margin-top: 20px;
    .rule-spread{
      margin: 0 auto;
      position: relative;
      width: 300px;
      height: 300px;
      background: url('../../assets/images/p3/spread.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      .rule-center{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 140px;
        background: url('../../assets/images/p3/rule-center.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .rule-card{
      position: absolute;
      top: 0;
      left: 0;
      width: 260px;
      height: 72px;
      display: flex;
      background: url('../../assets/images/p3/card1.png') no-repeat;
      padding: 10px;
      transition: all .8s;
      .card-l, .card-r{
        .title{
          font-size: 18px;
          color: rgba(255,255,255,.8);
        }
        .num{
          font-size: 24px;
          color: rgba(255,255,255);
          &>span{
            font-size: 14px;
            color: rgba(255,255,255,.8);
          }
        }
      }
      .card-l{
        margin-right: 16px;
      }
    }
    .card1{
      top: 0;
      left: 360px;
      .line{
        position: absolute;
        top: 70px;
        left: 120px;
        width: 4px;
        height: 40px;
        background: rgba(77,158,171,0.5);
      }
      &.active{
        background: url('../../assets/images/p3/card1-active.png') no-repeat;
        .line{
          background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(27,223,255,1) 25%, rgba(255,255,255,0) 100%);
        }
      }
    }
    .card2{
      top: 80px;
      left: 90px;
      background: url('../../assets/images/p3/card2.png') no-repeat;
      .line{
        position: absolute;
        top: 40px;
        left: 260px;
        width: 60px;
        height: 4px;
        background: rgba(77,158,171,0.5);
        &::before{
          content: '';
          position: absolute;
          top: 9px;
          left: 56px;
          width: 35px;
          height: 4px;
          background: rgba(77,158,171,0.5);
          transform: rotate(30deg);
        }
      }
      &.active{
        background: url('../../assets/images/p3/card2-active.png') no-repeat;
        .line{
          background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(27,223,255,1) 100%);
        }
        .line::before{
          background: linear-gradient(to right,rgba(27,223,255,1) 0%, rgba(255,255,255,0) 100%);
        }
      }
    }
    .card3{
      top: 80px;
      left: 630px;
      background: url('../../assets/images/p3/card2.png') no-repeat;
      .line{
        position: absolute;
        top: 40px;
        right: 260px;
        width: 60px;
        height: 4px;
        background: rgba(77,158,171,0.5);
        &::before{
          content: '';
          position: absolute;
          top: 9px;
          right: 56px;
          width: 35px;
          height: 4px;
          background: rgba(77,158,171,0.5);
          transform: rotate(-30deg);
        }
      }
      &.active{
        background: url('../../assets/images/p3/card2-active.png') no-repeat;
        .line{
          background: linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(27,223,255,1) 100%);
        }
        .line::before{
          background: linear-gradient(to left,rgba(27,223,255,1) 0%, rgba(255,255,255,0) 100%);
        }
      }
    }
    .card4{
      top: 190px;
      left: 140px;
      background: url('../../assets/images/p3/card3.png') no-repeat;
      .line{
        position: absolute;
        top: 40px;
        left: 260px;
        width: 50px;
        height: 4px;
        background: rgba(77,158,171,0.5);
        &::before{
          content: '';
          position: absolute;
          top: -12px;
          left: 42px;
          width: 35px;
          height: 4px;
          background: rgba(77,158,171,0.5);
          transform: rotate(-50deg);
        }
      }
      &.active{
        background: url('../../assets/images/p3/card3-active.png') no-repeat;
        .line{
          background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(27,223,255,1) 100%);
        }
        .line::before{
          background: linear-gradient(to right,rgba(27,223,255,1) 0%, rgba(255,255,255,0) 100%);
        }
      }
    }
    .card5{
      top: 190px;
      left: 580px;
      background: url('../../assets/images/p3/card3.png') no-repeat;
      .line{
        position: absolute;
        top: 40px;
        right: 260px;
        width: 50px;
        height: 4px;
        background: rgba(77,158,171,0.5);
        &::before{
          content: '';
          position: absolute;
          top: -12px;
          right: 42px;
          width: 35px;
          height: 4px;
          background: rgba(77,158,171,0.5);
          transform: rotate(50deg);
        }
      }
      &.active{
        background: url('../../assets/images/p3/card3-active.png') no-repeat;
        .line{
          background: linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(27,223,255,1) 100%);
        }
        .line::before{
          background: linear-gradient(to left,rgba(27,223,255,1) 0%, rgba(255,255,255,0) 100%);
        }
      }
    }
  }
}
</style>
