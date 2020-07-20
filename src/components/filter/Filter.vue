<template>
<div class="filter-box">
  <div class="filter-opt">
    <a-icon type="filter" />
  </div>
  <div class="filter-opt" v-for="(item,index) in filterParams" :key="item.id" :id="index">
    <a-select
      mode="multiple"
      :size="size"
      placeholder="请选择"
      :showArrow="true"
      :defaultValue="item[0].key"
      style="width: auto;minWidth: 160px"
      @change="value => handleChange(value,index)"
      @popupScroll="popupScroll"
    >
      <a-select-option v-for="i in item" :key="i.key">
        {{i.value }}
      </a-select-option>
    </a-select>
  </div>
</div>
</template>

<script>
export default {
  name: "filter-opt",
  props: ["filterParams"],
  data() {
    return {
      size: "small",
    };
  },
  methods: {
    handleChange(value,index) {
      console.log(`Selected: ${value}`,value);
      this.$emit('func',{ type: index,value:value})
    },
    popupScroll() {
      console.log("popupScroll");
    }
  }
};
</script>
<style lang="less">
.filter-box {
  position: fixed;
  margin: -50px 0 0 -20px;
  padding: 0 0 0 20px;
  height: 50px;
  width: 100%;
  line-height: 55px;
  background: #f1f0ef;
  z-index: 3;
}
.filter-opt {
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>

