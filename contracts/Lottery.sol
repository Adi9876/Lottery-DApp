// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <=0.9.0;

contract Lottery {
    address public manager;
    address[] public players;
    address[] pastWinners;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Access to Manager Only!!");
        _;
    }

    function partCount() public view returns (uint256) {
        return players.length;
    }

    function receiveEth() public payable {
        require(msg.value >= 0.01 ether, "Send more than 0.01 ethers");
        players.push(msg.sender);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function getWinner() public onlyManager {
        require(players.length > 0, "Players count is 0");
        uint256 index = random() % players.length;
        address payable winnerPlayer = payable(players[index]);
        pastWinners.push(winnerPlayer);
        winnerPlayer.transfer(address(this).balance);
        players = new address[](0);
    }

    
}
