<template>
 <div>
 <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-progress="handleProgress"
  :file-list="fileList"
  :on-error="handleCompleted"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
</el-upload>
<div class="generatedUrl" >{{d3epUrl}}</div>
 </div>
</template>

<script>
console.log("D3EP Share...");

export default {
  data() {
    return {
      fileList: [],
      d3epUrl: ""
    };
  },
  methods: {
    handlePreview() {},
    handleRemove() {},
    handleProgress() {
      console.log("Encrypting media...");
      setTimeout(
        () => console.log("Sending media to Proxy Re-Encryption Server"),
        500
      );
    },
    handleCompleted() {
      this.d3epUrl = "d33p://2Js2FSE View with https://D3EP.me";
      console.log(this.d3epUrl);
      console.log("Encrypted file uploaded!");
    }
  }
};
</script>

<style>
.el-upload {
  display: block;
}
.generatedUrl {
  margin: 10px;
  font-size: 11px;
  color: midnightblue;
  padding: 5px;
}

.upload-demo {
  display: block;
  height: 100%;
}

.el-upload-dragger {
  width: 100%;
}
</style>