import forge from 'node-forge'
import RSAProxyReencrypt from 'rsa-proxy-reencrypt'
var rsa = forge.pki.rsa;

function do_encryption(file){
  // need client keys on hand
  var publicKey = localStorage["publicKey"]
  var privateKey = localStorage["privateKey"]
  // OR use storage.get("privateKey")

  // need the publicKeys of followers
  var followerKeys = localStorage["followerKeys"]

  // create blob for all the things starting with the file
  var myBlobBuilder = new MyBlobBuilder();

  // encrypt the original file
  this.file_blob = new Blob(file, { type: "text/plain" })
  myBlobBuilder.append(publicKey.encrypt(this.file_blob));

  // create re-encryption keys for the proxy
  const encrypter = new RSAProxyReencrypt({
    rsa: { privateKey: ownerPrivateKey }
  })

  // add them to the blob
  followerKeys.forEach(fk => {
    let { proxyKey, userKey } = encrypter.generateReencryptionKey(fk)
    myBlobBuilder.append(","+proxyKey+","+userKey)
  });

  // finish blob
  var final_blob = myBlobBuilder.getBlob();
  const encrypted_file = encrypter.encrypt(final_blob)
  return encrypted_file
}


function decrypt_data(encrypted_file){
  const userEncrypter = new RSAProxyReencrypt({
    rsa: { privateKey: localStorage["privateKey"] }
  })
  var decyrpted_blob = proxyEncrypter.decrypt(userDecryptable)
  // this blob doesn't have parts - it's just the image
  decyrpted_blob.lastModifiedDate = new Date();
  decyrpted_blob.name = "decrypted.jpg";
  return decyrpted_blob
}


var MyBlobBuilder = function() {
  this.parts = [];
}

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


// credit: https://stackoverflow.com/questions/15970729/appending-blob-data
