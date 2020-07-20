<template>
  <div class="content">
    <div class="card" v-for="(item, index) in items" :key="index">
      <a-card size="small" title="全行公司客户数">
        <!-- <a href="#" slot="extra">操作</a> -->
        <p class="num">{{ '123123243' | numFormat}}</p>
      </a-card>
    </div>
    
  </div>
</template>
<script>
const arr = function () {
  let arr = []
  for (let i = 0; i < 20; i++) {
    arr.push(i)
  }
  return arr
}
export default {
  props:['cardData'],
  data() {
    return {
      items: arr()
    }
  },
};
</script>

<style lang="less">
.content {
  display: flex;
  flex-wrap: wrap;

  .card {
    margin: 2px;
    // border: 1px solid red;
    width: 240px;
    cursor: pointer;

    &:hover {
      -webkit-box-shadow: 0 10px 6px -6px #777;
      -moz-box-shadow: 0 10px 6px -6px #777;
      box-shadow: 0 10px 6px -6px #777;
    }

    .num {
      font-size: 20px;
      // font-weight: bold;
    }
  }
}
</style>

