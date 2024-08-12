//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/LoyaltyToken.sol";

contract MyDeployScript is Script {

  function run() public {

    //use the deployers' address as the owner
    uint256 privateKey = vm.envUint("PRIVATE_KEY");
    address owner = vm.addr(privateKey);

 console.log("Initializing deploy script stay ready..............");


  //Deploy the TokenFactory contract using the owner address
  vm.startBroadcast(privateKey);
  TokenFactory tokenFactory = new TokenFactory();
  vm.stopBroadcast();
  console.log("TokenFactory deployed to: %s", address(tokenFactory));

  console.log("Token Factory has been deployed successfully, initialixing sample.....");

  console.log("Starting a process of creating a new Token using Token Factory........");
  vm.startBroadcast(privateKey);
  BusinessToken newToken = tokenFactory.createToken(
  "NAIVASLOYALTY",
 "NVLT",
  500000 * 10 ** 18,
  owner
  );
  vm.stopBroadcast();


  console.log("New token deployed: %s", address(newToken));

  console.log("Displaying information about the token");
  // Log the details of the created token
        console.log("New token deployed:");
        console.log("  Address: %s", address(newToken));
        console.log("  Name: %s", newToken.name());
        console.log("  Symbol: %s", newToken.symbol());
        console.log("  Total Supply: %s", newToken.totalSupply());
        console.log("  Owner: %s", newToken.owner());

  console.log("Business Token successfully deployed for Naivas,........program should soon exit");
  }
}
