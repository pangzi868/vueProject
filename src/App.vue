<template>
<a-config-provider :locale="locale">
  <div id="app">
    <Layout></Layout>
  </div>
</a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import Layout from './components/layout.vue'

export default {
  name: "app",
  data() {
    return {
      locale: zhCN,
    }
  },
  components: {
    Layout
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
</style>
