web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse(getAbi());
KycContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = KycContract.at(getAddress());
console.log(contractInstance.address);

function submitData() {
	console.log("HELLO");
	var name = document.getElementById("name").value.toString();
	var gender = document.getElementById("gender").value.toString();
	var dob = document.getElementById("dob").value.toString();
	var marital = document.getElementById("maritalstatus").value.toString();
	var aadhar = document.getElementById("aadhar").value.toString();
	var driver = document.getElementById("driverslicense").value.toString();
	var pan = document.getElementById("pan").value.toString();
	var email = document.getElementById("email").value.toString();
	var mobile = document.getElementById("mobile").value.toString();
	console.log(name);
	
	contractInstance.addCustomer(name,gender,dob,marital,aadhar,driver,pan,email,mobile,false,web3.eth.accounts[0],{from: web3.eth.accounts[0],gas:3000000});

	
	alert("KYC Record added");
}