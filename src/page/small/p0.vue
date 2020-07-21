<template>
  <div class="container">
    <div :class="'brain-bgg'">
    </div>
    <!-- <iframe width="100%" height="100%" src="http://localhost:3880/#/manage/P1" name='{"status":0,"msg":"OK","data":{"data":[{"total":1390,"days":"20190920"},{"total":1180,"days":"20190921"},{"total":148,"days":"20190924"},{"total":508,"days":"20190925"}]}}' frameborder="0"></iframe> -->
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.init();
    
  },
  methods: {
    init() {
      
    },
    
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 2560px;
  height: 1440px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  color: #fff;
  background-size: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  .brain-bgg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    color: #fff;
    background-size: 70%;
    #video {
      height:100%;
      width: 100%;
    }
  }
  
}
</style>
