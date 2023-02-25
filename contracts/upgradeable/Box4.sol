// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./Box2.sol";

contract Box4 is Box2 {
    string private name;

    event NameChanged(string name);

    function setName(string memory _name) public {
        name = _name;
        emit NameChanged(name);
    }

    function getName() public view returns (string memory){
        return string(abi.encodePacked("Name: ", name));
    }
}
