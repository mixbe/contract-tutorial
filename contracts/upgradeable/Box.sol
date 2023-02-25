// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract Box {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(value);
    }

    /***
     * @dev read the last stored value
     *
     * @param
     * @return
     */
    function retrieve() public view returns (uint256){
        return value;
    }

}
