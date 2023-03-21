// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IERC20.sol";

contract LouToken is IERC20 {
    string private _name; // 代币名称
    string private _symbol; // 代币代号
    uint8 public _decimals; // 代币精度

    uint256 private _totalSupply; // 代币总供给
    mapping(address => uint256) private _balances; // 代币账本
    mapping(address => mapping(address => uint256)) private _allowance; // 代币授权记录
    address public _owner;

    modifier onlyOwner() {
        require(_owner == msg.sender, "Is not owner address");
        _;
    }

    constructor(
        string memory _initName,
        string memory _initSymbol,
        uint256 _initTotalSupply
    ) {
        _name = _initName;
        _symbol = _initSymbol;
        _decimals = 18;
        _totalSupply = _initTotalSupply * 10 ** 18;
        _owner = msg.sender;

        // 将发行的所有代币转到 owner
        _balances[_owner] = _totalSupply;
    }

    // 铸造代币
    function mint(uint256 _initTotalSupply) public onlyOwner {
        _totalSupply += _initTotalSupply;
        _balances[_owner] += _initTotalSupply;

        emit Transfer(address(0), msg.sender, _initTotalSupply);
    }

    // 授权转账
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        require(sender != address(0), "sender is zero address");
        require(recipient != address(0), "recipient is zero address");
        require(sender != recipient, "sender and recipient is same address");
        // 判断发送者余额是否充足
        require(_balances[sender] > amount, "sender insufficient balance");

        // 判断授权额度是否足够
        require(
            _allowance[sender][msg.sender] > amount,
            "insufficient allowance"
        );

        // 减少授权额度
        _allowance[sender][msg.sender] -= amount;

        _balances[sender] -= amount;
        _balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);

        return true;
    }

    // 转账 amount 数量的代币
    function transfer(address to, uint256 amount) external returns (bool) {
        // 判断余额是否充足
        require(_balances[msg.sender] > amount, "insufficient balance");

        _balances[msg.sender] -= amount;
        _balances[to] += amount;

        // 触发转账事件
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    // 获取授权额度
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256) {
        require(owner != address(0), "owner is zero address");
        return _allowance[owner][spender];
    }

    // 授权额度
    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "spender is zero address");
        require(msg.sender != spender, "is same address");
        // 添加授权额度
        _allowance[msg.sender][spender] = amount;

        // 触发授权事件
        emit Approval(msg.sender, spender, amount);

        return true;
    }

    // 获取代币总供给
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    // 获取账本中的余额
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    // 获取代币名称
    function name() external view returns (string memory) {
        return _name;
    }

    // 获取代币符号
    function symbol() external view returns (string memory) {
        return _symbol;
    }

    // 返回精度值
    function decimals() external view returns (uint8) {
        return _decimals;
    }
}
