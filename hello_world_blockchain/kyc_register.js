web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "uname", "type": "bytes32" }, { "name": "gender", "type": "bytes32" }, { "name": "dob", "type": "bytes32" }, { "name": "maritalStatus", "type": "bytes32" }, { "name": "aadharNumber", "type": "bytes32" }, { "name": "driversLicense", "type": "bytes32" }, { "name": "pan", "type": "bytes32" }, { "name": "email", "type": "bytes32" }, { "name": "phone", "type": "bytes32" }, { "name": "isVerified", "type": "bool" }, { "name": "oAddress", "type": "address" } ], "name": "addCustomer", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "name", "type": "bytes32" } ], "name": "addNewCustomer", "outputs": [ { "name": "", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "uname", "type": "bytes32" }, { "name": "password", "type": "bytes32" }, { "name": "eth", "type": "address" } ], "name": "addOrganization", "outputs": [ { "name": "", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "approveRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "x", "type": "bytes32" } ], "name": "bytes32ToString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "uemail", "type": "bytes32" }, { "name": "orgAddress", "type": "address" } ], "name": "ifAllowed", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "oname", "type": "bytes32" }, { "name": "index", "type": "uint256" } ], "name": "isAvailable", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "uemail", "type": "bytes32" }, { "name": "oname", "type": "bytes32" }, { "name": "orgAddress", "type": "address" } ], "name": "sendRequest", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "checkDeployed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "oname", "type": "bytes32" }, { "name": "index", "type": "uint256" } ], "name": "getCustomerData", "outputs": [ { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCustomersCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOrganizationCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getOrganizationData", "outputs": [ { "name": "", "type": "bytes32" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getOrganizationName", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "uemail", "type": "bytes32" } ], "name": "getRequestOrgs", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ]');
KYCContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KYCContract.at('0x81401e95b9073d334309306cc6a5eee76fe54d49');

console.log(contractInstance.address);

function submitData() {
	console.log("HELLO");
	var name = document.getElementById("name").value;
	var gender = document.getElementById("gender").value;
	var dob = document.getElementById("dob").value;
	var marital = document.getElementById("maritalstatus").value;
	var aadhar = document.getElementById("aadhar").value;
	var driver = document.getElementById("driverslicense").value;
	var pan = document.getElementById("pan").value;
	var email = document.getElementById("email").value;
	var mobile = document.getElementById("mobile").value;

	console.log(name);
	
	/*name = web3.toAscii(name);
	gender = web3.toAscii(gender);
	dob = web3.toAscii(dob);
	marital = web3.toAscii(marital);
	aadhar = web3.toAscii(aadhar);
	driver = web3.toAscii(driver);
	pan = web3.toAscii(pan);
	email = web3.toAscii(email);
	mobile = web3.toAscii(mobile);
	console.log(name);
	console.log(gender);
	console.log(dob);
	console.log(marital);
	console.log(aadhar);
	console.log(driver);
	console.log(pan);
	console.log(email);
	console.log(mobile);
	*/
//	console.log(contractInstance.checkDeployed());
//	console.log(contractInstance.addNewCustomer);
// 	contractInstance.addNewCustomer(name,{from: web3.eth.accounts[0]});
	contractInstance.addCustomer(name,gender,dob,marital,aadhar,driver,pan,email,mobile,false,web3.eth.accounts[0],{from: web3.eth.accounts[0],gas:3000000});


}