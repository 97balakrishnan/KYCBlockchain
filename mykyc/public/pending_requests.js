web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse(getAbi());
KycContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KycContract.at(getAddress());
var uemail = window.localStorage.getItem('uemail');
var globalOrgname="";
$(document).ready(function() {
  
	  
	  console.log(uemail);
	  var allOrgs = contractInstance.getRequestOrgs(uemail);
	  console.log(allOrgs);
	var orgs = allOrgs.split(",");
	console.log(orgs);
	for(var i=1;i<orgs.length;i++) {
		orgname = orgs[i];
		index=i-1;
		$("#box").append('<center><span class="ant-input-group-wrapper" style="margin-bottom: 20px;"> <span class="ant-input-wrapper ant-input-group"> <span style="margin-bottom: 0px;padding: 0px"> <span style="margin-right: 7px; margin-left: 7px;font-size: 20px">Organization : </span> </span> <span style="margin-bottom: 0px;padding: 0px"> <span ><i class="anticon anticon-file-text"></i></span> <span id="orgname" style="font-size: 20px">'+orgname+'</span> </span> <br> <center> <span style="margin-top:5px;margin-bottom: 5px"> <span style="margin-left: 5px"> <span style="padding:2%;" class="press ant-btn mine-button animate"> <div class="glyphicon glyphicon-ok" onclick="globalOrgname=\''+orgname+'\';approve();"></div> </span> </span> <span style="margin-left: 5px;"> <span style="padding:2%" class="press ant-btn mine-button animate"> <div onclick="globalOrgname=\''+orgname+'\';reject();" class="glyphicon glyphicon-remove"></div> </span> </span> </span> <center> </span> </span></center>');  }
});
function approve() {
	console.log("approval uemail = "+uemail+" orgname= "+globalOrgname);
	contractInstance.approveRequest(globalOrgname,uemail,{from: web3.eth.accounts[0],gas:3000000});
	window.alert("Request approved for organization :\n"+globalOrgname);
}