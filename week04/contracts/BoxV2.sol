// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./BoxV1.sol";

contract BoxV2 is Box {
    function increment() public {
        store(retrieve() + 1);
    }
}
