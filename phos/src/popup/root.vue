<template>
  <el-tabs class="main-tab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    {{example}}
  </el-tabs>
</template>
<script>
export default {
  data: () => ({
    example: "hi"
  }),
  computed: {},
  created() {
    console.log("New tab");
  },
  mounted() {},
  methods: {
    tab() {
      chrome.tabs.create({ url: "pages/app.html" });
    }
  }
};
</script>
<style lang="scss">
div {
  color: blue;
}

.main-tab {
  width: 300px;
  height: 500px;
}
</style>
