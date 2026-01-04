// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Faucet {
    address public owner;
    uint256 public withdrawAmount = 0.1 ether;
    mapping(address => uint256) public lastAccessTime;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function requestTokens() public {
        require(address(this).balance >= withdrawAmount, "Faucet empty");
        require(
            block.timestamp - lastAccessTime[msg.sender] >= 1 days,
            "Wait 1 day"
        );
        lastAccessTime[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(withdrawAmount);
    }

    function withdrawAll() external {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
}
