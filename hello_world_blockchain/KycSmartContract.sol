pragma solidity ^0.4.23;

contract KycSmartContract {

    struct Customer {
        bytes32 uname;
        bytes32 gender;
        bytes32 dob;
        bytes32 maritalStatus;
        bytes32 aadharNumber;
        bytes32 driversLicense;
        bytes32 pan;
        bytes32 email;
        bytes32 phone;
        bytes32 dataHash;
        bool isVerified;
        address oAddress;
    }

    struct Organisation {
        bytes32 oname;
        address oAddress;
    }

    struct Request {
        bytes32 uemail;
        bytes32 oname;
        address orgAddress;
        bool isAllowed;
    }

    Customer[] allCustomers;
    Organisation[] allOrgs;
    Request[] allRequests;
    
    constructor() public {
        
    }
    
    function checkDeployed() view returns(bool){
    return true;
    }
    function getDataHash(uint index) view returns(bytes32) {
        return blockhash(index);
    }
    function addOrganization(bytes32 uname,bytes32 password,address eth) public returns(uint) {
            bytes memory b = abi.encodePacked(password);
            allOrgs.length ++;
            allOrgs[allOrgs.length - 1] = Organisation(uname,eth);
            return 0;
    }
    
    function getOrganizationName(uint index) view returns (bytes32){
      return allOrgs[index].oname;
    }
    
    function getOrganizationCount() view returns (uint) {
      return allOrgs.length;
    }
    
    function getOrganizationData(uint index) view returns (bytes32,address) {
        return (allOrgs[index].oname,allOrgs[index].oAddress);
    }

    function addCustomer(bytes32 uname, bytes32 gender, bytes32 dob, bytes32 maritalStatus, bytes32 aadharNumber, bytes32 driversLicense, bytes32 pan, bytes32 email, bytes32 phone,bool isVerified, address oAddress) public returns(uint) {
        allCustomers.length ++;
        bytes32 dataHash =blockhash(block.number);
        allCustomers[allCustomers.length-1] = Customer(uname,gender,dob,maritalStatus,aadharNumber,driversLicense,pan,email,phone,dataHash,isVerified,oAddress);
        return 0;
    }
    
    function getCustomersCount() view returns (uint){
        return allCustomers.length;
    }
   
    function isAvailable(bytes32 oname,uint index) returns(bool){
        bool dAvailable = false;
        for(uint i=0;i<allRequests.length;i++) {
            if(allRequests[i].oname==oname)
                if( allCustomers[index].email==allRequests[i].uemail)
                    if(allRequests[i].isAllowed == true) {
                        dAvailable = true;  
            } 
        }
        return dAvailable;
    }
    
    function getCustomerData(bytes32 oname,uint index) view returns (bytes32,bytes32,bytes32,bytes32,bytes32,bytes32,bool,address){
        bytes32 n = "";
       Customer storage c = allCustomers[index];
        
        if(isAvailable(oname,index)==true) {
            return (c.uname,c.email,c.phone,c.driversLicense,c.aadharNumber,c.pan,c.isVerified,c.oAddress);
        }
        else {
            return (c.uname,c.email,n,n,n,n,c.isVerified,c.oAddress);
        }
    }
    
    function sendRequest(bytes32 uemail,bytes32 oname,address orgAddress) public {
        allRequests.length ++;
        allRequests[allRequests.length - 1] = Request(uemail,oname,orgAddress,false);
    }
    
    function approveRequest(uint index) {
        allRequests[index].isAllowed=true;
    }
    
    function getRequestOrgs(bytes32 uemail) view returns(string) {
        string memory orgList="";
        for(uint i=0;i<allRequests.length;i++) {
            if(allRequests[i].uemail==uemail) {
                orgList = append(orgList,bytes32ToString(allRequests[i].oname));
            }
        }
        return orgList;
    }
    
    function append(string a, string b) internal pure returns (string) {
        return string(abi.encodePacked(a,",",b));
    }
    
    function bytes32ToString(bytes32 x) public returns (string memory) {
      bytes memory bytesString = new bytes(32);
      uint charCount = 0;
      for (uint j = 0; j < 32; j++) {
          byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
          if (char != 0) {
              bytesString[charCount] = char;
              charCount++;
          }
      }
      bytes memory bytesStringTrimmed = new bytes(charCount);
      for (j = 0; j < charCount; j++) {
          bytesStringTrimmed[j] = bytesString[j];
      }
      return string(bytesStringTrimmed);
    }
  
    function ifAllowed(bytes32 uemail, address orgAddress) public returns(bool) {
        for(uint i = 0; i < allRequests.length; ++i) {
            if(allRequests[i].uemail==uemail && allRequests[i].orgAddress == orgAddress && allRequests[i].isAllowed) {
                return true;
            }
        }
        return false;
    }
    
    
}
