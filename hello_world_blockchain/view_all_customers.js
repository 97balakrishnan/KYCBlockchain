web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse(getAbi());
KycContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KycContract.at(getAddress());
window.localStorage.setItem('oname', 'airtel');
window.localStorage.setItem('oaddress',"0x00");

var oaddress = window.localStorage.getItem('oaddress');
var oname = window.localStorage.getItem('oname');

$(document).ready(function() {
  customersCount = contractInstance.getCustomersCount();
  console.log(customersCount);
  for(var i=0;i<customersCount;i++) {
  	var date = new Date();
  	var customerData = contractInstance.getCustomerData(oaddress,i);
  	console.log(i);
  	console.log(customerData[0]);
  	let dataHash = contractInstance.getDataHash(i);
	  let name = web3.toAscii(customerData[0]);
	  let email = web3.toAscii(customerData[1]);
	  $("#box").append('<i class="anticon anticon-down" style="display: block; font-size: 24pt; margin-bottom: 27px;"></i> <div class="ant-card genesis block block-shadow ant-card-bordered"> <div class="ant-card-body"> <div> <span class="ant-input-group-wrapper" style="margin-bottom: 20px;"> <span class="ant-input-wrapper ant-input-group"> <span class="ant-input-group-addon"> <span style="margin-right: 7px; margin-left: 7px;">Name </span> </span> <span class="genesis-data genesis-mutate genesis-mutate-2 ant-input-affix-wrapper"> <span class="ant-input-prefix"> <i class="anticon anticon-file-text"></i> </span> <span class="ant-input">'+name+' </span> </span> </span> </div> <div> <span class="ant-input-group-wrapper" style="margin-bottom: 20px;"> <span class="ant-input-wrapper ant-input-group"> <span class="ant-input-group-addon"> <span style="margin-right: 7px; margin-left: 7px;">Email</span> </span> <span class="genesis-data genesis-mutate genesis-mutate-2 ant-input-affix-wrapper"> <span class="ant-input-prefix"><i class="anticon anticon-file-text"></i></span> <span class="ant-input">'+email+' </span> </span> </span> </div> <center><div> <button id="'+i+'" onclick="requestKYC(this)" style="padding:10%"type="button" class="press ant-btn mine-button animate">  <span style="color: white;">Request</span> </button> </div> </center> </div> </div>');  
	}	  
});
function requestKYC(button) {
	var customerIndex = button.id;
	var customerData = contractInstance.getCustomerData(oaddress,customerIndex);
	contractInstance.sendRequest(customerData[1],oname,web3.eth.accounts[0],{from: web3.eth.accounts[0],gas:3000000});
	window.alert("KYC Data Request sent to \n"+web3.toAscii(customerData[0]));
}
