// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../interfaces/IOracleWrapper.sol";
import "@switchboard-xyz/evm.js/contracts/Aggregator.sol";


contract ChainlinkOracleWrapper is IOracleWrapper, AggregatorV3Interface {
    // errors

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        // Ensure the string is not longer than 32 bytes
        require(bytes(source).length <= 32, "Source string too long");
        // Cast the string to bytes32 and return
        assembly {
            result := mload(add(source, 32))
        }
    }
    error RoundEmpty(bytes32 feedName, uint80 roundId);

    address public switchboardPricesContract;
    address public feedId;
    bytes32 public feedName;
    string public name;
    string public description;
    address private _deployer;
    Aggregator public aggregrator;
    constructor(
        address _switchboard, // Switchboard contract address
        address _feedId,
        string memory _feedName, // Function id corresponding to the feed
        string memory _name, // Name of the feed
        string memory _description
    ) {
        switchboardPricesContract = _switchboard;
        feedId = _feedId;
        feedName = stringToBytes32(_feedName);
        name = _name;
        description = _description;
        _deployer = msg.sender;
        aggregrator = new Aggregator(
            _switchboard,
            _feedId,
            stringToBytes32(_feedName),
            _name,
            _description
        );
    }

    function decimals() external pure override(IOracleWrapper, AggregatorV3Interface) returns (uint8) {
        return 18;
    }

    function version() external pure override returns (uint256) {
        return 1;
    }

    function viewLatestRoundData() external view returns (uint80, int256, uint256, uint256, uint80) {
        return aggregrator.viewLatestRoundData();
    }

    function viewRoundData(uint80 _roundId) external view returns (uint80, int256, uint256, uint256, uint80) {
        return aggregrator.viewRoundData(_roundId);
    }
function getPrice() external view override returns (int256) {
    (, int256 price, , , ) = aggregrator.viewLatestRoundData();
    return price;
}

function getPriceAndMetadata() external view override returns (int256 _price, bytes memory _data) {
    (, _price, , , ) = aggregrator.viewLatestRoundData();
    return (_price, _data);

}

function latestRoundData() external view override returns (uint80, int256, uint256, uint256, uint80) {
    return aggregrator.viewLatestRoundData();

}
function getRoundData(uint80 _roundId) external view override returns (uint80, int256, uint256, uint256, uint80) {
    return aggregrator.viewRoundData(_roundId);

}


function fromWad(int256 wad) external view override returns (int256) {
    return wad / 10**18;

}

function poll() external override returns (int256) {
    (, int256 price, , , ) = aggregrator.viewLatestRoundData();
    return price;

}

function oracle() external view override returns (address) {
    return address(aggregrator);

}

function deployer() external view override returns (address) {
    return _deployer;

}



}