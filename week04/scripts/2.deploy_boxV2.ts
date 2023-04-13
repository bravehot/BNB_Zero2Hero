// Make box contract upgradable to boxV2 contract

import { ethers, upgrades } from "hardhat";
import { readAddressList, storeAddressList } from "./helper";

// original Box(proxy) address
const proxyAddress = "0x1cB25bC3bA1F8373F45EB9aEAcFd7FAd39b33C20";

const main = async () => {
  const addressList = readAddressList() as any;

  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV2 = await ethers.getContractFactory("BoxV2");

  console.log("upgrade to BoxV2...");
  const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2);

  const boxV2Proxy = boxV2.address;
  const boxV2Implementation = await upgrades.erc1967.getImplementationAddress(
    boxV2.address
  );
  const boxV2Admin = await upgrades.erc1967.getAdminAddress(boxV2.address);
  console.log("BoxV2 Proxy Address", boxV2Proxy);
  console.log("BoxV2 Implementation Address", boxV2Implementation);
  console.log("BoxV2 Admin Address", boxV2Admin);

  addressList["boxV2Proxy"] = boxV2Proxy;
  addressList["boxV2Implementation"] = boxV2Implementation;
  addressList["boxV2Admin"] = boxV2Admin;

  storeAddressList(addressList);
};

main().catch((err) => {
  console.log("err: ", err);
  process.exitCode = 1;
});
