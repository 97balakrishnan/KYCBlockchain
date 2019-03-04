$(document).ready(function() {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    abi = JSON.parse(getAbi());
    KycContract = web3.eth.contract(abi);
    contractInstance = KycContract.at(getAddress());
});

var userkey;
function sendKey(ukey) {
    userkey = ukey;
    var customerIndex = localStorage.getItem('customerindex');
	var customerData = contractInstance.getCustomerData(customerIndex);
	var name=web3.toAscii(customerData[0]);
	var email=web3.toAscii(customerData[1]);
	var encryptedCompressedData = web3.toAscii(customerData[2]);
	var verifier = web3.toAscii(customerData[3]);
	
	if (userkey == null || userkey == "") {
		alert("Invalid key !");
	} else {
		$.post("/view_customer",{json:encryptedCompressedData,key:userkey},function(data,status){
			
			if(data.error=='invalid_key') {
				alert("Invalid key error!");
			}
			else{
				alert("Valid key !");
				sendAlertMail(name,email);
				loadCustomer(data.json,verifier);
			}
		});
	}
}
function loadCustomer(jsonString,verifier){
	localStorage.setItem('json',jsonString);
	localStorage.setItem('verifier',verifier);
	location.href="http://localhost:3000/view_customer_kyc.html"
}

function sendAlertMail(name,email) {
	var d = new Date();
	console.log(d.toString());
	$.post("/alertmail",{name:name,email:email,key:userkey,time:d.toString(),oname:localStorage.getItem('oname')},function(data,status){
		
	});
}