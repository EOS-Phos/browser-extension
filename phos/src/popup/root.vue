<template>
  <el-container class="demo-form-inline">
  <el-main>
    <img src="../../static/icons/eos-logo.png" class="image" />
    <el-row :gutter="10" type="flex">
  <el-col :offset="3" ><el-input class="password" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input></el-col>
</el-row>
<el-row :gutter="10" type="flex">
  <el-col :offset="3" ><el-button justify="center" class="btnSubmit" @click="onSubmit">Login</el-button></el-col>
</el-row>
  </el-main>
  <el-footer>
    <footer>Powered by</footer>
  </el-footer>
</el-container>
</template>
<script>
var forge = require("node-forge");
var rsa = forge.pki.rsa;

function getLocalKeyPair() {
  if (localStorage["publicKey"] == null) {
    console.log("Generating local keypair...");
    rsa.generateKeyPair({ bits: 2048, workers: 2 }, function(err, keypair) {
      localStorage["publicKey"] = forge.pki.publicKeyToPem(keypair.publicKey);
      localStorage["privateKey"] = forge.pki.privateKeyToPem(keypair.privateKey);
      console.log("Local keypair generated");
    });
  }
}
function getWallet() {
  console.log("Generating wallet...");
}

export default {
  data() {
    return {
      ruleForm2: {
        pass: ""
      }
    };
  },
  methods: {
    onSubmit() {
      getLocalKeyPair();
      getWallet();
    },
    tab() {
      chrome.tabs.create({ url: "pages/app.html" });
    }
  }
};
</script>
<style lang="scss">
.demo-form-inline {
  width: 300px;
  height: 500px;
}
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.btnSubmit {
  width: 80%;
  margin-top: 5px;
}

.password {
  margin-top: 200px;
  width: 80%;
}

.poweredBy {
  height: 60;
}
</style>
