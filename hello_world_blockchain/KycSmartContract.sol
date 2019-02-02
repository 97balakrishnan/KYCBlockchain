pragma solidity ^0.4.23;

contract KycSmartContract {

    struct Customer {
        string uname;
        string gender;
        string dob;
        string maritalStatus;
        string aadharNumber;
        string driversLicense;
        string pan;
        string email;
        string phone;
        bytes32 dataHash;
        bool isVerified;
        address oAddress;
    }

    struct Organisation {
        string oname;
        string password;
        address oAddress;
    }

    struct Request {
        string uemail;
        string oname;
        address orgAddress;
        bool isAllowed;
    }

    Customer[] allCustomers;
    Organisation[] allOrgs;
    Request[] allRequests;
    bytes32[] orgNamesList;
    
    constructor() public {
        
    }
    
    function checkDeployed() view returns(bool){
    return true;
    }
   
    function addOrganization(string uname,string password,address eth) public payable returns(uint) {
            allOrgs.length ++;
            allOrgs[allOrgs.length - 1] = Organisation(uname,password,eth);
            return 0;
    }
    
    function getOrganizationName(uint index) view returns (string){
      return allOrgs[index].oname;
    }
    
    function getOrganizationCount() view returns (uint) {
      return allOrgs.length;
    }
    
    function getOrganizationData(uint index) view returns (string,address) {
        return (allOrgs[index].oname,allOrgs[index].oAddress);
    }
    
    function addCustomer(string uname, string gender, string dob, string maritalStatus, string aadharNumber, string driversLicense, string pan, string email, string phone, bytes32 dataHash, bool isVerified, address oAddress) public payable returns(uint) {
        allCustomers.length ++;
        dataHash = block.blockhash(block.number);
        allCustomers[allCustomers.length-1] = Customer(uname,gender,dob,maritalStatus,aadharNumber,driversLicense,pan,email,phone,dataHash,isVerified,oAddress);
        return 0;
    }
    
    function getCustomersCount() view returns (uint){
        return allCustomers.length;
    }
    
    function getCustomerData(string oname,uint index) view returns (string,string,string,string,string,string,string,string,string,bytes32,bool,address,bool){
        bool isAvailable = false;
        for(uint i=0;i<allRequests.length;i++) {
            if(stringsEqual(allRequests[i].oname,oname) && stringsEqual(allCustomers[index].email,allRequests[i].uemail) && allRequests[i].isAllowed == true) {
              isAvailable = true;  
            } 
        }
        return (allCustomers[index].uname,allCustomers[index].gender,allCustomers[index].dob,allCustomers[index].maritalStatus,allCustomers[index].aadharNumber,allCustomers[index].driversLicense,allCustomers[index].pan,allCustomers[index].email,allCustomers[index].phone,allCustomers[index].dataHash,allCustomers[index].isVerified,allCustomers[index].oAddress,isAvailable);
    }

    function sendRequest(string uemail,string oname,address orgAddress) public payable{
        allRequests.length ++;
        allRequests[allRequests.length - 1] = Request(uemail,oname,orgAddress,false);
    }
    
    function approveRequest(uint index) {
        allRequests[index].isAllowed=true;
    }
    
    function getRequestOrgs(string uemail) view returns(string) {
        string memory orgList="";
        for(uint i=0;i<allRequests.length;i++) {
            if(stringsEqual(allRequests[i].uemail,uemail)) {
                orgList = append(orgList,allRequests[i].oname);
            }
        }
        return orgList;
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
  
    function append(string a, string b) internal pure returns (string) {
        return string(abi.encodePacked(a,",",b));
    }
    
    function ifAllowed(string memory Uname, address orgAddress) public payable returns(bool) {
        for(uint i = 0; i < allRequests.length; ++i) {
            if(stringsEqual(allRequests[i].uname, Uname) && allRequests[i].orgAddress == orgAddress && allRequests[i].isAllowed) {
                return true;
            }
        }
        return false;
    }

    function getOrgRequestAddress(string memory Uname, uint ind) public payable returns(address) {
        uint j = 0;
        for(uint i=0;i<allRequests.length;++i) {
            if(stringsEqual(allRequests[i].uname, Uname) && j == ind && allRequests[i].isAllowed == false) {
                return allRequests[i].orgAddress;
            }
            j++;
        }
        return allRequests[0].orgAddress;
    }

    function allowBank(string memory Uname, address orgAddress, bool isAllowed) public payable {
        for(uint i = 0; i < allRequests.length; ++ i) {
            if(stringsEqual(allRequests[i].uname, Uname) && allRequests[i].orgAddress == orgAddress) {
                if(isAllowed) {
                    allRequests[i].isAllowed = true;
                } else {
                    for(uint j=i;j<allRequests.length-2; ++j) {
                        allRequests[i] = allRequests[i+1];
                    }
                    allRequests.length --;
                }
                return;
            }
        }
    }

    function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
        bytes storage a = bytes(_a);
        bytes memory b = bytes(_b);
        if (a.length != b.length)
          return false;
        
        for (uint i = 0; i < a.length; i ++)
              {
          if (a[i] != b[i])
            return false;
              }
        return true;
    }

    
}
