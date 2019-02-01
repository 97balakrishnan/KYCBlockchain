pragma solidity ^0.4.23;

contract KycSmartContract {

    struct Customer {
        string uname;
        string dataHash;
        address oAddress;
    }

    struct Organisation {
        string oname;
        address oAddress;
    }

    struct Request {
        string uname;
        address orgAddress;
        bool isAllowed;
    }

    Customer[] allCustomers;

    Organisation[] allOrgs;

    Request[] allRequests;

    bytes32[] orgNamesList;
    constructor(bytes32[] oNames) public {

      for(uint i=0;i<oNames.length;i++){
          addOrganization(bytes32ToString(oNames[i]),msg.sender);
      }
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
    
    function checkDeployed() view returns(bool){
    return true;
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

    function addRequest(string memory Uname, address orgAddress) public payable {
        for(uint i = 0; i < allRequests.length; ++ i) {
            if(stringsEqual(allRequests[i].uname, Uname) && allRequests[i].orgAddress == orgAddress) {
                return;
            }
        }
        allRequests.length ++;
        allRequests[allRequests.length - 1] = Request(Uname, orgAddress, false);
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

    function addOrganization(string uname, address eth) public payable returns(uint) {
            allOrgs.length ++;
            allOrgs[allOrgs.length - 1] = Organisation(uname, eth);
            return 0;
    }


    function addCustomer(string memory Uname, string  DataHash,address oAddress) public payable returns(uint) {
        allCustomers.length ++;
        allCustomers[allCustomers.length-1] = Customer(Uname, DataHash, oAddress);
        return 0;
    }
    function getCustomersCount() view returns (uint){
        return allCustomers.length;
    }
    function getCustomerData(uint index) view returns (string,string,address){
        return (allCustomers[index].uname,allCustomers[index].dataHash,allCustomers[index].oAddress);
    }

}
