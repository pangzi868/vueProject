<template>
  <a-menu theme="dark" 
  :defaultSelectedKeys="['1']" 
  :inlineIndent=12
  mode="inline">
    <template v-for="(menu) in menus">
      <a-menu-item v-if="!menu.children" :key="menu.key">
          <a-icon type="pie-chart" />
          <span>{{menu.title}}</span>
      </a-menu-item>
      <sub-menu v-else :menu-info="menu" :key="menu.key" />
    </template>
  </a-menu>
</template>
<script>
import menus from "../config/menu.js";
import SubMenu from "./layout/subMenu";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    menus() {
      return menus;
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
  components: {
    "sub-menu": SubMenu
  }
};
</script>

