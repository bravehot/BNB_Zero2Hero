import { ethers, upgrades } from "hardhat";
import { readAddressList, storeAddressList } from "./helper";

async function main() {
  const addressList = readAddressList() as any;

  const Box = await ethers.getContractFactory("Box");

  // 会生成 3 个地址，一个代理合约地址，一个实现合约地址，一个管理合约地址
  const box = await upgrades.deployProxy(Box, [42], {
    initializer: "initialize",
  });

  await box.deployed();

  const implementation = await upgrades.erc1967.getImplementationAddress(
    box.address
  );
  const admin = await upgrades.erc1967.getAdminAddress(box.address);

  addressList["boxProxy"] = box.address;
  addressList["boxProxyImplementation"] = implementation;
  addressList["boxProxyAdmin"] = admin;

  storeAddressList(addressList);
}

main().catch((err) => {
  console.log("err: ", err);
  process.exitCode = 1;
});
