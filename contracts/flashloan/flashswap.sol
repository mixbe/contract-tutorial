// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@studydefi/money-legos/uniswapV2/contracts/IUniswapV2Router02.sol";
import "@studydefi/money-legos/uniswapV2/contracts/IUniswapV2Pair.sol";
import "@studydefi/money-legos/uniswapV2/contracts/IUniswapV2Factory.sol";
import "hardhat/console.sol";


interface IUniswapV2Callee {
    function uniswapV2Call(address sender, uint256 amount0, uint256 amount1, bytes calldata data) external;
}

contract Flashswap is IUniswapV2Callee {
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private constant UniswapV2Factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    function uniswapV2Call(address _sender, uint256 _amount0, uint256 _amount1, bytes calldata _data) external override {

        console.log("msg sender is pair: ", msg.sender);

        address token0 = IUniswapV2Pair(msg.sender).token0();
        address token1 = IUniswapV2Pair(msg.sender).token1();
        address pair = IUniswapV2Factory(UniswapV2Factory).getPair(token0, token1);

        require(msg.sender == pair, "!pair");
        require(_sender == address(this), "!sender");

        (address tokenBorrow, uint amount) = abi.decode(_data, (address, uint));
        // 0.3% fees
        uint fee = ((amount * 3) / 997) + 1;
        uint amountToRepay = amount + fee;
        IERC20(tokenBorrow).transfer(pair, amountToRepay);
    }

    /***
     * @notice test flash swap
     *
     * @param  _tokenBorrow  borrow token address
     * @param  _amount
     * @return
     */
    function testFlashSwap(address _tokenBorrow, uint _amount) external {
        address pair = IUniswapV2Factory(UniswapV2Factory).getPair(_tokenBorrow, WETH);
        console.log("testFlashSwap  | pair: %s", pair);
        require(pair != address(0), "!pair");
        address token0 = IUniswapV2Pair(pair).token0();
        address token1 = IUniswapV2Pair(pair).token1();

        uint256 amount0Out = _tokenBorrow == token0 ? _amount : 0;
        uint256 amount1Out = _tokenBorrow == token1 ? _amount : 0;

        bytes memory data = abi.encode(_tokenBorrow, _amount);
        IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), data);
    }

}
