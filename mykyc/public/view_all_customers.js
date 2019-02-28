web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse(getAbi());
KycContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KycContract.at(getAddress());

var oname = window.localStorage.getItem('oname');

$(document).ready(function() {
  customersCount = contractInstance.getCustomersCount();
  console.log(customersCount);
  
  for(var i=0;i<customersCount;i++) {
  	var date = new Date();
  	var customerData = contractInstance.getCustomerData(i);
  	
  	console.log(web3.toAscii(customerData[0])+"\n"+web3.toAscii(customerData[1]));
	
	var name = web3.toAscii(customerData[0]);
	var email = web3.toAscii(customerData[1]);
	let dataHash = contractInstance.getDataHash(i);
	
	$("#box").append('<i class="anticon anticon-down" style="display: block; font-size: 24pt; margin-bottom: 27px;"></i> <div class="ant-card genesis block block-shadow ant-card-bordered"> <div class="ant-card-body"> <div> <span class="ant-input-group-wrapper" style="margin-bottom: 20px;"> <span class="ant-input-wrapper ant-input-group"> <span class="ant-input-group-addon"> <span style="margin-right: 7px; margin-left: 7px;">Name </span> </span> <span class="genesis-data genesis-mutate genesis-mutate-2 ant-input-affix-wrapper"> <span class="ant-input-prefix"> <i class="anticon anticon-file-text"></i> </span> <span class="ant-input">'+name+' </span> </span> </span> </div> <div> <span class="ant-input-group-wrapper" style="margin-bottom: 20px;"> <span class="ant-input-wrapper ant-input-group"> <span class="ant-input-group-addon"> <span style="margin-right: 7px; margin-left: 7px;">Email</span> </span> <span class="genesis-data genesis-mutate genesis-mutate-2 ant-input-affix-wrapper"> <span class="ant-input-prefix"><i class="anticon anticon-file-text"></i></span> <span class="ant-input">'+email+' </span> </span> </span> </div> <center><div> <button id="'+i+'" onclick="viewKYC(this)" style="padding:10%"type="button" class="press ant-btn mine-button animate">  <span style="color: white;">View KYC</span> </button> </div> </center> </div> </div>');  
  }	  

});
function viewKYC(button) {
	var customerIndex = button.id;
	var customerData = contractInstance.getCustomerData(customerIndex);
	var encryptedCompressedData = web3.toAscii(customerData[2]);
	var verifier = web3.toAscii(customerData[3]);
	var userkey = prompt("Please enter customer userkey : ", "xxxxxxxxxx");
	if (userkey == null || userkey == "") {
		alert("Invalid key !");
	} else {
		$.post("/view_customer",{json:encryptedCompressedData,key:userkey},function(data,status){
			alert("Hello");
			if(data.error=='invalid_key') {
				alert("Invalid key error!");
			}
			else{
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
