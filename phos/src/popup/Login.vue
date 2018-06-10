<template>
<div>
  <el-container class="demo-form-inline">
      
  <el-main>
<div v-show="showLogin">
    <img src="../../static/icons/d3ep.png" class="image" />
    <el-row :gutter="10" type="flex">
  <el-col ><el-input class="password" type="password"  auto-complete="off"></el-input></el-col>
</el-row>
<el-row :gutter="10" type="flex">
  <el-col ><el-button justify="center" class="btnSubmit" @click="onSubmit">Login</el-button></el-col>
</el-row>
</div>
    <el-tabs v-show="!showLogin" v-model="activeTab">
        <el-tab-pane label="Sharing" name="sharing">
            <sharing></sharing>
        </el-tab-pane>
        <el-tab-pane label="Settings" name="settings">
            <settings></settings>
        </el-tab-pane>
</el-tabs>
 </el-main>
  <el-footer>
      <img src="../../static/icons/eosiosg.png" class="poweredBy" />
  </el-footer>
</el-container>
</div>
</template>
<script>
import sharing from "./sharing.vue";
import settings from "./settings.vue";

var forge = require("node-forge");
var rsa = forge.pki.rsa;

function getLocalKeyPair() {
  if (localStorage["publicKey"] == null) {
    console.log("Generating local keypair...");
    rsa.generateKeyPair({ bits: 2048, workers: 2 }, function(err, keypair) {
      localStorage["publicKey"] = forge.pki.publicKeyToPem(keypair.publicKey);
      localStorage["privateKey"] = forge.pki.privateKeyToPem(
        keypair.privateKey
      );
      console.log("Local keypair generated");
    });
  }
}
function getWallet() {
  console.log("Generating wallet...");
}

function getShowLogin() {
  console.log(localStorage["showLogin"]);
  return localStorage["showLogin"] == null ? true : localStorage["showLogin"];
}

export default {
  data() {
    return {
      showLogin: getShowLogin(),
      activeTab: "sharing"
    };
  },
  methods: {
    onSubmit() {
      this.showLogin = false;
      localStorage["showLogin"] = false;
      getLocalKeyPair();
      getWallet();
    },
    tab() {
      chrome.tabs.create({ url: "pages/app.html" });
    }
  },
  components: {
    sharing,
    settings
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
  width: 100%;
  margin-top: 5px;
}

.password {
  margin-top: 80px;
  width: 100%;
}

.welcome-text {
  text-align: center;
  font-weight: 300;
  color: lightskyblue;
}

.poweredBy {
  height: 50px;
  bottom: 0;
  position: fixed;
  margin-left: 50px;
}
</style>