<template>
<div>
 <router-link to="/home">Go to home</router-link>
    <router-link to="/about">Go to about</router-link>
    <router-view></router-view></div>
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
