var express=require("express");
var path=require("path");
var bodyparser=require("body-parser");
var zlib = require('zlib');
var LZUTF8 = require('lzutf8');
var brotli = require('brotli');
var CryptoJS = require("crypto-js");
var app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname,'public')));

app.get('/reg',function(req,res){
	res.sendFile(__dirname+"/public/kyc_register.html");
});
app.get('/org_login',function(req,res){
	res.sendFile(__dirname+"/public/org_login.html");
});

app.listen(3000,function(){
	console.log("Server Running in the port 3000");
})
app.post('/compress-lzutf8',function(req,res){
	
	console.log(req.body.json);
	var input = req.body.json;
	//var input = CryptoJS.AES.decrypt(ciphertext, "mypassword" ).toString(CryptoJS.enc.Utf8);
	console.log("Decrypted : "+input+"\n\n");

   	console.log("Original size : "+input.length);
   	console.log("\n\n");
   	
   	var deflated = LZUTF8.compress(input);
   	console.log("Deflated : "+deflated.byteLength);
   	console.log("Deflated : "+deflated.toString('utf8'));
   	console.log("Deflated : "+deflated.join(""));

   	var deflatedString = getString(deflated);
  	//var deflatedEncrypt = CryptoJS.AES.encrypt(deflatedString,"mypassword").toString();
   	res.send(deflatedString);
	
});

app.post('/compress-deflate',function(req,res){
	
	console.log(req.body.json);
	var ciphertext = req.body.json;
	var input = CryptoJS.AES.decrypt(ciphertext, "mypassword" ).toString(CryptoJS.enc.Utf8);
	console.log("Decrypted : "+input+"\n\n");

   	console.log("Original size : "+input.length);
   	console.log("\n\n");
   	
	var deflatedString = zlib.deflateSync(input).toString('base64');
	
	console.log("Deflated : "+deflatedString);
	console.log("Deflated size : "+deflatedString.length);
   	//console.log("Deflated string: "+getString(deflated));
   	//console.log("Deflated join: "+deflated.join(""));

   	//var deflatedString = getString(deflated);
   	var deflatedEncrypt = CryptoJS.AES.encrypt(deflatedString,"mypassword").toString();
   	res.send(deflatedEncrypt);

});

app.post('/compress-brotli',function(req,res){
	
	console.log(req.body.json);
	var ciphertext = req.body.json;
	var input = CryptoJS.AES.decrypt(ciphertext, "mypassword" ).toString(CryptoJS.enc.Utf8);
	console.log("Decrypted : "+input+"\n\n");

   	console.log("Original size : "+input.length);
   	console.log("\n\n");
   	
	var deflated = brotli.compress(input);
	console.log("deflated "+deflated);
	//console.log("inflated : "+brotli.decompress(getString(deflated)));
	console.log("inflated string : "+brotli.decompress(deflated));
	console.log("Deflated bytelength: "+deflated.byteLength);
   	console.log("Deflated string: "+getString(deflated));
   	console.log("Deflated join: "+deflated.join(""));

   	var deflatedString = getString(deflated);
   	var deflatedEncrypt = CryptoJS.AES.encrypt(deflatedString,"mypassword").toString();
   	res.send(deflatedEncrypt);

});
app.post('/view_customer',function(req,res){

	res.setHeader('Content-Type', 'application/json');
    	
	var encryptedJSON = req.body.json;
	var key = req.body.key;
	try{
		var input = CryptoJS.AES.decrypt(ciphertext, "mypassword" ).toString(CryptoJS.enc.Utf8);
		var jsonString = decompress(input);
		res.send(JSON.stringify({error:"",json:jsonString}));
	}
	catch(err) {
		res.send(JSON.stringify({ error: "invalid_key" }));
		//res.json({error:"invalid_key"}).send("localhost:3000/invalid_key.html")
	}
	
	console.log(key);

});
function getString(ba) {
	var result="";
	for(var i = 0; i < ba.length; ++i){
		result+= (String.fromCharCode(ba[i]));
	}
	console.log(result);
	return result;
	
}
function getBytes(str) {
	var bytes = [];
	var charCode;

	for (var i = 0; i < str.length; ++i)
	{
	    charCode = str.charCodeAt(i);
	    bytes.push(charCode & 0xFF);
	}

	return bytes;
}
function getByteLength(str) {
	return Buffer.byteLength(str,'utf8');
}

app.post('/decompress',function(req,res){

	console.log(req.body.cjson);
	var encrypted = req.body.cjson;
	console.log("encrypted  : "+encrypted);

	var deflatedString = CryptoJS.AES.decrypt(encrypted, "mypassword" ).toString(CryptoJS.enc.Utf8);
	var deflatedBytes = getBytes(deflatedString);
	console.log("deflated : "+deflatedString);
	console.log("deflated : "+deflatedBytes);
	//var inflated = zlib.inflateSync(deflatedBytes.toString('base64')).toString();
	var inflated = LZUTF8.decompress(new Buffer(deflatedBytes,'base64')).toString();
	console.log("inflated : "+inflated.toString());
	
	var inflatedEncrypt = CryptoJS.AES.encrypt(inflated,"mypassword").toString();
	console.log(inflatedEncrypt);
	res.send(inflatedEncrypt);
	
});
function decompress(deflatedString) {
	var deflatedBytes = getBytes(deflatedString);
	console.log("deflated : "+deflatedString);
	console.log("deflated : "+deflatedBytes);
	//var inflated = zlib.inflateSync(deflatedBytes.toString('base64')).toString();
	var inflated = LZUTF8.decompress(new Buffer(deflatedBytes,'base64')).toString();
	return inflated;
}
	/*
	console.log("\n\n");
	console.log("Compression using lzutf8");
	var output = LZUTF8.compress(input);
	var newSize2 = getByteLength(output);
	console.log("Output size : "+newSize2+" bytes");
	
	console.log("Compression ratio : "+((newSize2/oldSize)*100).toPrecision(4)+"%");
	console.log("\n\nBrotli compression ")
	var bcompress = brotli.compress(input).toString('utf8');
	var newSize3 = getByteLength(bcompress);
	console.log("Output size : "+newSize3+" bytes");
	console.log("Compression ratio : "+((newSize3/oldSize)*100).toPrecision(4)+"%");
	console.log("\n\n--------------------------\n\n");
   	//var deflated = brotli.compress(input).toString('base64');
	//var deflated = zlib.deflateSync(input).toString('base64');
	console.log("deflated : "+deflated.toString('base64'));
	var newSize1 = getByteLength(deflated);
	console.log("Compression using deflate");
	console.log("Output size : "+newSize1+" bytes");
	console.log("Compression ratio : "+((newSize1*100)/oldSize).toPrecision(4)+"%");
	
	var deflatedEncrypt = CryptoJS.AES.encrypt(deflated, key, {iv: iv,padding:CryptoJS.pad.NoPadding});
	
	console.log(deflatedEncrypt.ciphertext);
	res.send(deflatedEncrypt.ciphertext);
	
	res.send("hello");
	*/