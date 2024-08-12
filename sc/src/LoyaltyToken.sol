// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyToken {
   address public owner;

    error ERC20InvalidSender();
    error ERC20InsufficientBalance();

    address tokenAddress;

    string tokenName;
    string tokenSymbol;

    uint256 initialSupply;
    uint256 totalTokenSupply;

    mapping(address tokenAddress => address tokenHolders) tokenToHolders;
    mapping(address tokenHolder => uint256 currTokenBalance) balancesTable;


    modifier onlyOwner() {
        require(msg.sender == owner, "OnlyOwnerCanPerformThis");
        _;
    }




  mapping(address account => uint256 balances) private tokenBalance;

   address[] BusinessTokens;

    mapping(address tokenAddress => address owner) public deployedTokens;

    event TokenCreated(string _name, string _symbol,uint256 initialSupply,  address _owner);


    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() {}

    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _owner
    ) public returns (string memory, string memory, address) {
        tokenName = _name;
        tokenSymbol = _symbol;
        tokenAddress = address(this);
        initialSupply = _initialSupply;
        totalTokenSupply = initialSupply;


        //Event once token is created to be consumed by the client
        emit TokenCreated(_name, _symbol, _initialSupply, _owner);

        return (tokenName, tokenSymbol, tokenAddress);
    }

    function setOwner(address _owner) public onlyOwner {
        _owner = msg.sender;
        owner = _owner;
    }


    function setInitialSupply(uint256 _initialSupply) public onlyOwner {
        initialSupply = _initialSupply;
    }


    function getTokenBalance(address tokenHolder) public view returns (uint256) {
        require(tokenHolder != address(0), "Zero_address");
        uint256 _tokenBalance = balanceOf(tokenHolder);
        return _tokenBalance;
    }


    function mintTokens(address _to, uint256 _amount) public onlyOwner {
        require(_to != address(0), "Really_zero_address_comeon");
        totalTokenSupply += _amount;
        tokenBalance[_to] += _amount;
         //_update(address(0), _to, _amount);
    }

    function balanceOf(address account) public view  returns (uint256) {
        return tokenBalance[account];
    }


    /**
    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            // Overflow check required: The rest of the code assumes that totalSupply never overflows
            totalTokenSupply += value;
        } else {
          uint256 _tokenBalance = balanceOf(from);
            uint256 fromBalance = _tokenBalance;
            if (fromBalance < value) {
                revert ERC20InsufficientBalance();
            }
            unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
                tokenBalance[from] = fromBalance - value;
            }
        }
    }
    **/

    function burnTokens(address _account, uint256 _value) internal {
        if (_account == address(0)) {
            revert ERC20InvalidSender();
        }
        require(balanceOf(_account) >= _value, "InsufficientBalance");
        totalTokenSupply -= _value;
        tokenBalance[_account] -= _value;
       // _update(account, address(0), value);
    }

    function totalSupply(address _tokenAddress) public view returns (uint256) {
      return balanceOf(_tokenAddress);
    }

    function transfer(address _from, address _to, uint256 _amount)  public {
      require(_to != address(0), "Zero_address");
      require(_amount < (msg.sender).balance, "InsufficientBalance");

      //Now adjusting the token balance using my cool way
      tokenBalance[_from] -= _amount;
      tokenBalance[_to] += _amount;
       //_update(_from, _to, _amount);
    emit Transfer( _from, _to,  _amount);
    }

}
