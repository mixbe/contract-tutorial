// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract StorageV5 {
    // maping
    mapping(string => uint256) public a;
    // array
    uint256[] public b;

    function setValue(string memory key, uint256 value) public {
        a[key] = value;
    }

    function push(uint256 value) public {
        b.push(value);
    }


}
