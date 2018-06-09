<template>
  <el-form ref="form" :model="formInline" class="demo-form-inline">
  <img src="../../static/icons/logo.png" class="image">
  <el-form-item>
  <el-input v-model="formInline.password" placeholder="Password"></el-input>
  </el-form-item>

  <el-form-item>
  <el-button type="primary" @click="onSubmit">Login</el-button>
  </el-form-item>
  
  </el-form>
  
</template>
<script>
export default {
  data() {
      return {
        formInline: {
          user: '',
          password: ''
        }
      }
    },
  methods: {
  onSubmit() {
        console.log('submit!');
      },
    tab() {
      chrome.tabs.create({ url: "pages/app.html" });
    }
  }
};
</script>
<style lang="scss">
.demo-form-inline {
  width: 400px;
  height: 500px;
}
.image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
</style>