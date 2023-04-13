// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./BoxV2.sol";

// Add new state variable
contract BoxV3 is BoxV2 {
    string public name;

    event NameChanged(string name);

    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }

    function getName() public view returns (string memory) {
        return string(abi.encodePacked("Name: ", name));
    }
}
