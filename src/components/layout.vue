<template>
  <a-layout class="layout" id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout class="content">
      <a-layout-content>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>-->
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  components: {}
};
</script>

<style lang="less">
.layout {
  .left-nav {
    // position: fixed;
    // height: 100%;
    // overflow: auto;
    .ant-layout-sider-trigger {
      // display: none;
    }
  }
  .content {
    background: #f1f0ef;
  }
}
</style>
