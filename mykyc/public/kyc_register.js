web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse(getAbi());
KycContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KycContract.at(getAddress());
console.log(contractInstance.address);
var compressedString;
var encrypted;
var encryptedString;
function submitData() {
	console.log("HELLO");
	var obj={name:"",gender:"",dob:"",marital:"",aadhar:"",driver:"",pan:"",email:"",mobile:""};
	obj.name = document.getElementById("name").value.toString();
	obj.gender = document.getElementById("gender").value.toString();
	obj.dob = document.getElementById("dob").value.toString();
	obj.marital = document.getElementById("maritalstatus").value.toString();
	obj.aadhar = document.getElementById("aadhar").value.toString();
	obj.driver = document.getElementById("driverslicense").value.toString();
	obj.pan = document.getElementById("pan").value.toString();
	obj.email = document.getElementById("email").value.toString();
	obj.mobile = document.getElementById("mobile").value.toString();
	
	var jsonString = JSON.stringify(obj);
	console.log("Original data : \n"+jsonString);
	console.log("Original length : "+jsonString.length);
	console.log("\n\n");
	encrypted = CryptoJS.AES.encrypt(jsonString, "mypassword");
	console.log("Original Encrypted data : \n"+encrypted.toString());
	console.log("Original Encrypted data length : "+encrypted.toString().length);
	console.log("\n\n");
	$.post("/compress",{json:encrypted.toString()},function(data,status){
    		compressedString=data;
			var decryptedCompress = CryptoJS.AES.decrypt(data, "mypassword").toString(CryptoJS.enc.Utf8);;
			console.log("compressed data : \n"+decryptedCompress);
			console.log("compressed length : "+decryptedCompress.length);
			console.log("\n\n");
			console.log("Compressed Encrypted data : \n"+compressedString);
			console.log("Compressed Encrypted length : "+compressedString.length);
			console.log("\n\n");
			decompressFn();
    });

	//contractInstance.addCustomer(name,gender,dob,marital,aadhar,driver,pan,email,mobile,false,web3.eth.accounts[0],{from: web3.eth.accounts[0],gas:3000000});
	
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
