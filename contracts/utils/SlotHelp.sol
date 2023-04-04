// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

contract SlotHelp {

    function dataSolot(uint256 slot) public pure returns (bytes32) {
        bytes memory slotEncoded = abi.encodePacked(slot);
        return keccak256(slotEncoded);

    }

    function mappingValueSlotString(uint256 slot, string memory key) public pure returns (bytes32) {
        bytes memory slotEncoded = abi.encodePacked(key, slot);
        return keccak256(slotEncoded);
    }

}
