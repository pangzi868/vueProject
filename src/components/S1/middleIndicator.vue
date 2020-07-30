<template>
  <div class="middle-indicator">
    <div class="indicator-left indicator-div">
      <div v-for="(item ,index) in leftIn" :key="index" class="single-indicator">
        <div class="in-name">{{item.name}}</div>
        <div class="in-bottom">
          <div :id="item.id" class="in-chart"></div>
          <div class="in-bottom-right">
            <div v-for="(items, indexs) in item.inName" :key="indexs" class="single-bottom-right">
              <span class="single-title">{{items}}</span>
              <span class="single-value">{{item.inNameEng[indexs]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-span">
      <div class="middle-title">增收节支金额</div>
      <div class="middle-value middle-interval">1209万元</div>
      <div class="middle-title">减少损失浪费</div>
      <div class="middle-value">19万元</div>
    </div>
    <div class="indicator-right indicator-div">
      <div v-for="(item ,index) in rightIn" :key="index" class="single-indicator">
        <div class="in-name">{{item.name}}</div>
        <div class="in-bottom">
          <div :id="item.id" class="in-chart"></div>
          <div class="in-bottom-right">
            <div v-for="(items, indexs) in item.inName" :key="indexs">
              <span class="single-title">{{items}}</span>
              <span class="single-value">{{item.inNameEng[indexs]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["ids", "chartData"],
  mounted() {},
  data() {
    return {
      leftIn: [
        {
          id: "excutive",
          name: "审计项目执行情况",
          inName: ["已结", "实施", "未启"],
          inNameEng: ["done", "doing", "beDoing"]
        },
        {
          id: "putIn",
          name: "审计人员投入情况",
          inName: ["专职人", "兼职人", "其他人"],
          inNameEng: ["full", "part", "else"]
        }
      ],
      rightIn: [
        {
          id: "budget",
          name: "审计费用预算分析",
          inName: ["费用发生", "年度预算"],
          inNameEng: ["cost", "yearly"]
        },
        {
          id: "change",
          name: "审计问题整改情况",
          inName: ["整改完", "未整改"],
          inNameEng: ["done", "beDoing"]
        }
      ]
    };
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.middle-span {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 440px;
  height: 388px;
  text-align: center;
  background: rgba(15, 67, 97, 0.6);
  padding: 28px 52px;
  .middle-title {
    color: rgba(255, 255, 255, 1);
    font-family: Microsoft YaHei;
    font-weight: regular;
    font-size: 28px;
    line-height: 44px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 16px;
  }
  .middle-value {
    color: rgba(0, 255, 163, 1);
    font-family: Google Sans;
    font-weight: bold;
    font-size: 32px;
    line-height: 80px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 16px;
  }

  .middle-interval {
    margin-bottom: 40px;
  }
}
.indicator-div {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 44%;
  height: 100%;
  padding: 58px 68px;
  color: rgba(255, 255, 255, 1);
  .single-indicator {
    width: 50%;
    height: 100%;
    .in-bottom {
      display: flex;
    }
    .in-chart {
      display: inline-block;
      width: 290px;
      height: 270px;
    }
    .in-bottom-right {
      display: flex;
      height: 270px;
      width: 430px;
      flex-direction: column;
      justify-content: space-around;
      .single-bottom-right {
        width: 430px;
        .single-title {
          display: inline-block;
        }
        .single-value {
          display: inline-block;
        }
      }
    }
  }
}
.single-title {
  color: rgba(255, 255, 255, 0.6);
  margin-right: 30px;
}
.indicator-right {
  left: 56%;
}
</style>
