web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse(getAbi());
KycContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KycContract.at(getAddress());
console.log(contractInstance.address);
var compressedString;
var originalEncrypted;
var encryptedString;
var jsonString;
var compressedEncrypted;
var userkey;

var obj={name:"",gender:"",dob:"",marital:"",aadhar:"",driver:"",pan:"",email:"",mobile:""};

function submitData() {
	console.log("HELLO");
	
	obj.name = document.getElementById("name").value.toString();
	obj.gender = document.getElementById("gender").value.toString();
	obj.dob = document.getElementById("dob").value.toString();
	obj.marital = document.getElementById("maritalstatus").value.toString();
	obj.aadhar = document.getElementById("aadhar").value.toString();
	obj.driver = document.getElementById("driverslicense").value.toString();
	obj.pan = document.getElementById("pan").value.toString();
	obj.email = document.getElementById("email").value.toString();
	obj.mobile = document.getElementById("mobile").value.toString();
	
	

	jsonString = JSON.stringify(obj);
	console.log("Original data : \n"+jsonString);
	console.log("Original length : "+jsonString.length);
	console.log("\n\n");
	originalEncrypted = CryptoJS.AES.encrypt(jsonString, "mypassword").toString();
	console.log("Original Encrypted data : \n"+originalEncrypted);
	console.log("Original Encrypted data length : "+originalEncrypted.length);
	console.log("\n\n");
	
	
	
	compressLZUTF8();
	//compressDeflate();
	//compressBrotli();

	alert('customer added');

}
function compressDeflate(){
	$.post("/compress-deflate",{json:originalEncrypted},function(data,status){
		compressedString=data;
		var decryptedCompress = CryptoJS.AES.decrypt(data, "mypassword").toString(CryptoJS.enc.Utf8);;
		console.log("compressed data : \n"+decryptedCompress);
		console.log("compressed length : "+decryptedCompress.length);
		console.log("\n\n");
		console.log("Compressed Encrypted data : \n"+compressedString);
		console.log("Compressed Encrypted length : "+compressedString.length);
		console.log("\n\n");
		
		//contractInstance.addCustomer(compressedString,'goldenBank',{from: web3.eth.accounts[0],gas:3000000});
	});

}
function compressBrotli() {
	$.post("/compress-brotli",{json:originalEncrypted},function(data,status){
		compressedString=data;
		var decryptedCompress = CryptoJS.AES.decrypt(data, "mypassword").toString(CryptoJS.enc.Utf8);;
		console.log("compressed data : \n"+decryptedCompress);
		console.log("compressed length : "+decryptedCompress.length);
		console.log("\n\n");
		console.log("Compressed Encrypted data : \n"+compressedString);
		console.log("Compressed Encrypted length : "+compressedString.length);
		console.log("\n\n");
		
		//contractInstance.addCustomer(compressedString,'goldenBank',{from: web3.eth.accounts[0],gas:3000000});
	});

}
function compressLZUTF8() {

	$.post("/compress-lzutf8",{json:jsonString},function(data,status){
		compressedString=data;
		//var decryptedCompress = CryptoJS.AES.decrypt(data, "mypassword").toString(CryptoJS.enc.Utf8);;
		console.log("compressed data : \n"+compressedString);
		console.log("compressed length : "+compressedString.length);
		console.log("\n\n");
		userkey = Generate_key();
		console.log("User key : "+userkey);
		compressedEncrypted = CryptoJS.AES.encrypt(compressedString,userkey).toString();
		console.log("Compressed Encrypted data : \n"+compressedEncrypted);
		console.log("Compressed Encrypted length : "+compressedEncrypted.length);
		console.log("\n\n");
		
		contractInstance.addCustomer(obj.name,obj.email,compressedEncrypted,localStorage.getItem('oname'),{from: web3.eth.accounts[0],gas:3000000});

		sendMail(obj.name,obj.email);
	});

}
function sendMail(name,email) {
	$.post("/sendmail",{name:name,email:email,key:userkey},function(data,status){
		alert("User Passkey of "+name+" mailed to "+email+" ! ");
	});
}
function decompressFn() {

    $.post("/decompress",{cjson:compressedString},function(data,status){
			// console.log("Encrypted decompressed : "+data);
			// console.log("Encrypted decompressed length : "+data.length);
			// console.log("\n\n");
			decrypted = CryptoJS.AES.decrypt(data, "mypassword").toString(CryptoJS.enc.Utf8);;
			console.log("Original data : \n"+decrypted);
			console.log("Original data length : "+decrypted.length);
			console.log("\n\n");
	});
}
function Generate_key() {
    var key = "";
    var hex = "0123456789abcdefghijklmnopqrstuvwxyz";

    for (i = 0; i < 64; i++) {
        key += hex.charAt(Math.floor(Math.random() * 100)%hex.length);
        //Initially this was charAt(chance.integer({min: 0, max: 15}));
    }
    return key;
}
