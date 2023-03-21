# Homework

## Task01

#### 任务：部署 ERC-20 合约

[什么是 ERC-20 代币，以及 ERC-20 合约示例](https://ethereum.org/zh/developers/docs/standards/tokens/erc-20/)

#### Transactions in BSC Testnet Network

LouToken Contract Address:

[0xdBf491d7E00b8b184220c032039351bacb10c82E](https://testnet.bscscan.com/address/0xdbf491d7e00b8b184220c032039351bacb10c82e)

Approve:

[0x4cd463058b281bc36e106fd1438cf0c0caee8ca3e83471651e55757381177566](https://testnet.bscscan.com/tx/0x4cd463058b281bc36e106fd1438cf0c0caee8ca3e83471651e55757381177566)

Transfer:

[0x9bacd633262abd016799e0ce0de5677956d5edf988cf2ecd60f03f207f6bcc95](https://testnet.bscscan.com/tx/0x9bacd633262abd016799e0ce0de5677956d5edf988cf2ecd60f03f207f6bcc95)

Transfer From:

[0xbea3e40a6f4ff9865fc58ce2f9aa008bcd811995515bbed6ea96ced8ae5f6494](https://testnet.bscscan.com/tx/0xbea3e40a6f4ff9865fc58ce2f9aa008bcd811995515bbed6ea96ced8ae5f6494)

Mint:

[0xf7d7dd27b1da313158228b997940e7a35100c346cff7517058142aba8d952a40](https://testnet.bscscan.com/tx/0xf7d7dd27b1da313158228b997940e7a35100c346cff7517058142aba8d952a40)

## Task02

#### 任务：完成流动性挖矿合约的部署

[什么是流动性挖矿](https://mirror.xyz/xyyme.eth/_yGLvqTXQCX-UYRp_sWMR7MuDDKWuEhOw0S5QqJXr84)

#### SushiToken 合约地址
[0x036Ff3ba44C240748293e2d1d21edd53a4EdcC10](https://testnet.bscscan.com/address/0x036Ff3ba44C240748293e2d1d21edd53a4EdcC10)

#### MasterChef 合约地址

[0x372Eb2Ae24adA227E1A027761485ee14e584d103](https://testnet.bscscan.com/address/0x372Eb2Ae24adA227E1A027761485ee14e584d103)

#### 操作步骤

1. 部署质押奖励代币合约 SushiToken

2. 部署 MasterChef 业务合约
    *  传入 Sushi 奖励代币地址

3. 调用 SushiToken 中 transferOwnship 方法

   * 将 MasterChef 业务合约地址设置为 Owner 
   * Sushi 是由 MasterChef 合约发放奖励的，所以 MasterChef 合约是可以铸造 SushiToken，如果要想铸造 SushiToken 那么此时就必须是 SushiToken 的 owner

4. 部署 lpToken 合约

   * 使用 LouToken 作为 lpToken

5. 调用 LouToken 中的 Approval 将代币授权给 MasterChef

   * MasterChef 可以将代币放到质押池中

6. 添加 lpToken 质押池

   * 将 LouToken 添加进质押池

7. 调用 deposit 进行质押

8. 调用 withdraw 进行解除质押

#### Transactions
授权 Owner 交易哈希
[0x240e2c1aa71fb53ebd0583fc092b80ec5aa985d61860b63afd1fdaeb27bd858c](https://testnet.bscscan.com/tx/0x240e2c1aa71fb53ebd0583fc092b80ec5aa985d61860b63afd1fdaeb27bd858c)

LouToken Approval 交易哈希
[0x4fe926b29fc0c1a4f6e7f4742662d6a9b63867f7131276a200fc8a56ee1cef49](https://testnet.bscscan.com/tx/0x4fe926b29fc0c1a4f6e7f4742662d6a9b63867f7131276a200fc8a56ee1cef49)

添加进质押池
[0xbc3e96bbf139e729efcf8911ace3003441bf32e730e9474f6d7e3cc5170a4eeb](https://testnet.bscscan.com/tx/0xbc3e96bbf139e729efcf8911ace3003441bf32e730e9474f6d7e3cc5170a4eeb)

质押代币
[0x2b81fa10149cbaea005b88d9d42b4e156271fac7bcb04720fa947c0913a90c33](https://testnet.bscscan.com/tx/0x2b81fa10149cbaea005b88d9d42b4e156271fac7bcb04720fa947c0913a90c33)

解除质押
[0xec585e0f7232dda15bcedab7ce027e123c080319990714a77e8c93003ba2001c](https://testnet.bscscan.com/tx/0x2b81fa10149cbaea005b88d9d42b4e156271fac7bcb04720fa947c0913a90c33)
