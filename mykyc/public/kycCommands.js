Web3 = require('web3');
fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(web3.eth.accounts);
code = fs.readFileSync('KycSmartContract.sol').toString();
solc = require('solc');
compiledCode = solc.compile(code);
kycDefinition = JSON.parse(compiledCode.contracts[':KycSmartContract'].interface);
KycSmartContract = web3.eth.contract(kycDefinition);
byteCode = compiledCode.contracts[':KycSmartContract'].bytecode;
deployedContract = KycSmartContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000});
console.log("contract address : "+deployedContract.address);
web3.eth.defaultAccount = web3.eth.accounts[0]
deployedContract.addCustomer('swami','myhash',web3.eth.accounts[0],{from:web3.eth.accounts[0],gas:4700000})
web3.eth.blockNumber
currentBlock = web3.eth.blockNumber;
