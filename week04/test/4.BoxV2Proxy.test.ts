// 将 Box 合约升级为 BoxV2 合约

import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("Box V2 Proxy", () => {
  let box: Contract;
  let boxV2: Contract;

  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box");
    const BoxV2 = await ethers.getContractFactory("BoxV2");

    box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
    boxV2 = await upgrades.upgradeProxy(box.address, BoxV2);
  });

  it("should retrieve value previously stored and increment correctly", async () => {
    expect(await boxV2.retrieve()).to.equal(BigNumber.from("42"));
    await boxV2.increment();

    expect(await boxV2.retrieve()).to.equal(BigNumber.from("43"));
    await boxV2.store(100);
    expect(await boxV2.retrieve()).to.equal(BigNumber.from("100"));
  });
});
