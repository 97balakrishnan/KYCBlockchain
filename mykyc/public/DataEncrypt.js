function encrypt(msg,key) {
    var encrypted = CryptoJS.AES.encrypt(msg,key);
    return encrypted;
}
function decrypt(encrypted,key) {
    var decrypted = CryptoJS.AES.decrypt(encrypted,key);
    var msg = decrypted.toString(CryptoJS.enc.Utf8);
    return msg;

}