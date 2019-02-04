Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "uname", "type": "bytes32" }, { "name": "gender", "type": "bytes32" }, { "name": "dob", "type": "bytes32" }, { "name": "maritalStatus", "type": "bytes32" }, { "name": "aadharNumber", "type": "bytes32" }, { "name": "driversLicense", "type": "bytes32" }, { "name": "pan", "type": "bytes32" }, { "name": "email", "type": "bytes32" }, { "name": "phone", "type": "bytes32" }, { "name": "dataHash", "type": "bytes32" }, { "name": "isVerified", "type": "bool" }, { "name": "oAddress", "type": "address" } ], "name": "addCustomer", "outputs": [ { "name": "", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "uname", "type": "bytes32" }, { "name": "password", "type": "bytes32" }, { "name": "eth", "type": "address" } ], "name": "addOrganization", "outputs": [ { "name": "", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "approveRequest", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "x", "type": "bytes32" } ], "name": "bytes32ToString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "uemail", "type": "bytes32" }, { "name": "orgAddress", "type": "address" } ], "name": "ifAllowed", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "oname", "type": "bytes32" }, { "name": "index", "type": "uint256" } ], "name": "isAvailable", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "uemail", "type": "bytes32" }, { "name": "oname", "type": "bytes32" }, { "name": "orgAddress", "type": "address" } ], "name": "sendRequest", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "checkDeployed", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "oname", "type": "bytes32" }, { "name": "index", "type": "uint256" } ], "name": "getCustomerData", "outputs": [ { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "bool" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCustomersCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOrganizationCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getOrganizationData", "outputs": [ { "name": "", "type": "bytes32" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getOrganizationName", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "uemail", "type": "bytes32" } ], "name": "getRequestOrgs", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ]');
KYCContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KYCContract.at('0x7706454e4b32055529840448cba3630ed487cd62');



function submitData() {
	var name = document.getElementById("name").value;
	var gender = document.getElementById("gender").value;
	var dob = document.getElementById("dob").value;
	var marital = document.getElementById("maritalstatus").value;
	var aadhar = document.getElementById("aadhar").value;
	var driver = document.getElementById("driverslicense").value;
	var pan = document.getElementById("pan").value;
	var email = document.getElementById("email").value;
	var mobile = document.getElementById("mobile").value;

	
}