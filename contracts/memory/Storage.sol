// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Storage {
    uint256 public a;
    uint256 public b;
    uint256 private c;

    function foo() public {
        a = 1;
        b = 2;
        c = 123;
    }

}
