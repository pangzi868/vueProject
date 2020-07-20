<template>
  <div class="title-num">
    <div class="title">{{title}}</div>
    <div class="number">{{num}}</div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ['title','num'],
  mounted() {
  },
  data() {
    return {
      
    };
  },
  computed: {},
  methods: {

  },
    
  beforeDestroy() {
  },
};
</script>

<style lang="less" scoped>
  @font-face {
    font-family: "DS-Digital";
    src: url(./font/DS-DIGIB-2.ttf); /***兼容ie9***/
  }
  .title-num {
    padding: 40px 0 40px 40px;
    .title {
      color: #FFFFFF;
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 32px;
      line-height: normal;
      letter-spacing: 0px;
      text-align: center;
      padding-bottom: 30px;
    }
    .number {
      color: #FFFFFF;
      font-weight: bold;
      font-size: 64px;
      line-height: 72px;
      letter-spacing: 12px;
      text-align: center;
      font-family: 'DS-Digital';
    }
  }
</style>
