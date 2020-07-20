<template>
  <div class="nwwest-roll" id="nwwest-roll">
    <ul id="roll-ul" class="roll-ul">
      <li
        v-for="(item, index) in Totallist"
        :key="index"
        :ref="'rollul' + ids"
        :class="{anim:animate==true}"
      >
        <span class="total-money-span">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["number", "ids"],
  created() {
    this.scroll(this.number, this.$refs, this.ids);
  },
  mounted() {},
  data() {
    return {
      Totallist: [0, 0],
      animate: true
    };
  },
  computed: {},
  methods: {
    scroll(num, refs, ids) {
      if (refs === undefined || Object.keys(refs).length === 0) return;
      let rollulId = "rollul" + ids;
      let con1 = refs[rollulId];
      if (con1 === undefined) return;
      con1[0].style.marginTop = "-30px";
      this.animate = !this.animate;

      var that = this;
      setTimeout(function() {
        that.Totallist = [num, num];
        con1[0].style.marginTop = "0px";
        that.animate = !that.animate;
      }, 10);
    }
  },
  components: {},
  watch: {
    number: function(newVal) {
      this.scroll(newVal, this.$refs, this.ids);
    }
  }
};
</script>

<style lang="less">
.nwwest-roll {
  display: inline-block;
  height: 48%;
  overflow: hidden;
}

.roll-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nwwest-roll li {
  height: 100%;
  line-height: 100%;
}

.anim {
  transition: all 1s;
}
</style>
