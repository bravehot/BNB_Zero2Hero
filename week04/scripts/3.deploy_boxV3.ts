import { upgrades, ethers } from "hardhat";
import { readAddressList, storeAddressList } from "./helper";

// original Box(proxy) address
const proxyAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

async function main() {
  const addressList = readAddressList() as any;

  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV3 = await ethers.getContractFactory("BoxV3");

  console.log("upgrade to BoxV3...");
  const boxV3 = await upgrades.upgradeProxy(proxyAddress, BoxV3);

  const boxV3Proxy = boxV3.address;
  const boxV3Implementation = await upgrades.erc1967.getImplementationAddress(
    boxV3.address
  );
  const boxV3Admin = await upgrades.erc1967.getAdminAddress(boxV3.address);
  console.log("boxV3 Proxy Address", boxV3Proxy);
  console.log("boxV3 Implementation Address", boxV3Implementation);
  console.log("boxV3 Admin Address", boxV3Admin);

  addressList["boxV3Proxy"] = boxV3Proxy;
  addressList["boxV3Implementation"] = boxV3Implementation;
  addressList["boxV3Admin"] = boxV3Admin;

  storeAddressList(addressList);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
