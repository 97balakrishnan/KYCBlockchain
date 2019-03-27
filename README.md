# FYP Final Year Project
KYC Process using Blockchain Technology and WebDev

Uses

Ganache-cli,Web3Js,Remix.ethereum,nodeJS

Implementation stack:

1. Smart Contract - Ethereum smart contracts in Solidity
	- Remix GUI used for compiling and deploying the smart contract locally
	- Web3Js for communicating with smart contract
	- Ganache cli for creating test ethereum accounts 

2. Middleware - NodeJS with add-on libraries including cryptoJS for hashing  
                          Signatures and lzutf for compression

3. Frontend      - HTML/CSS 




First go to the mykyc directory

Execution instructions:

1. Start the ganache-cli in the following directory

	/mykyc/node_modules/.bin/ganache-cli

2. Open remix GUI in any browser :
	
http://remix.ethereum.org/

3. Paste the code from file KYCSmartContract.sol in remix file.(choose compiler version 0.4.24+)

4. In run tab choose web3js environment in the default localhost port 8545 and then click deploy.

5. Copy the address from the deployed contract and replace it in the MyContract.js file's getAddress() function

6. Open new terminal go to mykyc/public/ directory.

7. Type the following command :
	
node server

8. Open new tab in browser go to :
	
http://localhost:3000/


