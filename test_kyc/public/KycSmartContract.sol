pragma solidity ^0.4.23;
// mykyc contract
contract KycSmartContract {

    struct Customer {
        bytes name;
        bytes email;
        bytes kycData;
        bytes oName;
    }

    
    Customer[] allCustomers;
    
    constructor() public {
        
    }
    
    function checkDeployed() public view returns(bool){
        return true;
    }
    function getDataHash(uint index) public view returns(bytes32) {
        return blockhash(index);
    }
    
    function addCustomer(bytes name,bytes email,bytes kycData,bytes oName) public {
        allCustomers.length ++;
        allCustomers[allCustomers.length-1] = Customer(name,email,kycData,oName);
    }
    
    function getCustomersCount() public view returns (uint){
        return allCustomers.length;
    }
    
    function getCustomerData(uint index) public view returns (bytes name,bytes email,bytes kycData,bytes oName){
       Customer storage c = allCustomers[index];
       return (c.name,c.email,c.kycData,c.oName);
    }
}
