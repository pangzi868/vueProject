<template>
  <div class="container">
    <div :class="'brain-bgg'">
      <video id="video" width="640" height="360" :src="mp4" autobuffer autoplay> 
    </video>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import mp4 from '@/assets/video/aiWelcome.1977e135.mp4'
export default {
  data() {
    return {
      mp4: mp4
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
  width: 4224px;
  height: 1536px;
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
