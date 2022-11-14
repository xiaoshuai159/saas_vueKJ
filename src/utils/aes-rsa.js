import JSEncrypt from 'jsencrypt'  // rsa
import CryptoJS from 'crypto-js'   // aes

const methods = ['md2', 'md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'ripemd160']
export function getRandom (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
export function randomCode(){
  let code = ''
  for (var i = 0; i < 16; i++) {
    var type = getRandom(1, 3)
    switch (type) {
      case 1:
        code += String.fromCharCode(getRandom(48, 57))// 数字
        break
      case 2:
        code += String.fromCharCode(getRandom(65, 90))// 大写字母
        break
      case 3:
        code += String.fromCharCode(getRandom(97, 122))// 小写字母
        break
    }
  }
  // console.log(code);
  return code
}
// 获取RSA公钥和私钥
export function getRsaKey (size = 512) {
  let crypt = new JSEncrypt({
    default_key_size: size
  }).getKey()
  return {
    publicKeyBase64: crypt.getPublicBaseKeyB64(),
    privateKeyBase64: crypt.getPrivateBaseKeyB64(),
    publicKey: crypt.getPublicKey(),
    privateKey: crypt.getPrivateKey()
  }
}
// 使用RSA公钥加密
export function encryptRsa (publicKey, word) {
  let encrypt = new JSEncrypt()
  encrypt.setKey(publicKey)
  return encrypt.encrypt(word)
}
// 使用RSA私钥解密
export function decryptRsa (privateKey, word) {
  let decrypt = new JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  return decrypt.decrypt(word)
}
// 使用RSA私钥加密
export function encryptRsaByPrivateKey (privateKey, word) {
  let decrypt = new JSEncrypt()
  decrypt.setPrivateKey(privateKey)
  return decrypt.encrypt(word)
}
// 使用RSA公钥解密 jsencrypt不支持，此方法
export function decryptRsaByPublicKey (publicKey, word) {
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.decrypt(word)
}
// 使用RSA私钥加签
export function sign (privateKey, word, method = 'sha256') {
  if (!methods.includes(method)) {
    return new Error(`method must be one of ${methods.join(',')}`)
  }
  let encrypt = new JSEncrypt()
  encrypt.setPrivateKey(privateKey)
  // console.log(encrypt)
  return encrypt.sign(word, CryptoJS[method.toUpperCase()], method)
}
// 使用RSA公钥验签
export function verify (publicKey, word, signature, method = 'sha256') {
  if (!methods.includes(method)) {
    return new Error(`method must be one of ${methods.join(',')}`)
  }
  let decrypt = new JSEncrypt()
  decrypt.setPublicKey(publicKey)
  return decrypt.verify(word, signature, CryptoJS[method.toUpperCase()])
}
// 使用AES秘钥加密
export function encryptAes (secretKey, word) {
  secretKey = CryptoJS.enc.Utf8.parse(secretKey)
  // console.log(word);
  // while((word.length)%16!=0){
  //   word += '\0'
  // }
  word = CryptoJS.enc.Utf8.parse(word) 
  // console.log(word);
  let encrypted = CryptoJS.AES.encrypt(word, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  // console.log(encrypted)
  // debugger
  return encrypted.toString()
}
// 使用AES秘钥解密
export function decryptAes (secretKey, word) {
  secretKey = CryptoJS.enc.Utf8.parse(secretKey)
  let decrypted = CryptoJS.AES.decrypt(word, secretKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  // return decryptedStr.toString();
  // return CryptoJS.enc.Utf8.stringify(decrypted)
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export default {
  getRsaKey,
  encryptRsa,
  decryptRsa,
  sign,
  verify,
  // decryptRsaByPublicKey,
  encryptRsaByPrivateKey,
  encryptAes,
  decryptAes
}