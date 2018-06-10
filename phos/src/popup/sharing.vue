<template>
 <div>
 <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  :before-upload="encrypt"
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

import forge from "node-forge";
import RSAProxyReencrypt from "rsa-proxy-reencrypt";
var rsa = forge.pki.rsa;

var MyBlobBuilder = function() {
  this.parts = [];
};

MyBlobBuilder.prototype.append = function(part) {
  this.parts.push(part);
  this.blob = undefined; // Invalidate the blob
};

MyBlobBuilder.prototype.getBlob = function() {
  if (!this.blob) {
    this.blob = new Blob(this.parts, { type: "text/plain" });
  }
  return this.blob;
};

function do_encryption(file) {
  // need client keys on hand
  var publicKey = localStorage["publicKey"];
  var privateKey = localStorage["privateKey"];
  // OR use storage.get("privateKey")

  // need the publicKeys of followers
  var followerKeys = localStorage["followerKeys"];

  // create blob for all the things starting with the file
  var myBlobBuilder = new MyBlobBuilder();

  // encrypt the original file
  this.file_blob = new Blob([file], { type: "text/plain" });
  myBlobBuilder.append(publicKey.encrypt(this.file_blob));

  // create re-encryption keys for the proxy
  const encrypter = new RSAProxyReencrypt({
    rsa: { privateKey: ownerPrivateKey }
  });

  // add them to the blob
  var proxyKeys = [];
  followerKeys.forEach(fk => {
    proxyKeys.push(encrypter.generateReencryptionKey(fk));
  });

  // finish blob
  var final_blob = myBlobBuilder.getBlob();
  const encrypted_file = encrypter.encrypt(final_blob);
  return encrypted_file;
}

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
      this.d3epUrl = "d33p://34e521k View with https://D3EP.me";
      console.log(this.d3epUrl);
      console.log("Encrypted file uploaded!");
    },
    encrypt(file) {
      //var encrypted_file = do_encryption(file);
      //console.log(encrypted_file);
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