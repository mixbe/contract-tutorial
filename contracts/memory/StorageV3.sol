// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract StorageV3 {
    uint8 public a;
    uint256 private c;
    uint8 public b;

    function foo() public {
        a = 1;
        b = 2;
        c = 123;
    }
}
