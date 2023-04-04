// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract StorageV4 {
    string public a;
    string public b;

    function foo() public {
        // 31 bytes
        a = 'abcabcabcabcabcabcabcabcabcabca';
        // 32 bytes
        b = 'abcabcabcabcabcabcabcabcabcabcab';
    }

    function getEncode(uint slot) public view returns(bytes32) {
        return keccak256(abi.encode(slot));
    }


}
