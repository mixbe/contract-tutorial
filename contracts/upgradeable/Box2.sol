// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "./Box.sol";

contract Box2 is Box {
    function increment() public {
        store(retrieve() + 1);
    }


}
