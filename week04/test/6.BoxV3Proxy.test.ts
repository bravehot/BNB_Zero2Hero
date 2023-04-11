import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

describe("Box V2 Proxy", () => {
  let box: Contract;
  let boxV2: Contract;
  let boxV3: Contract;

  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box");
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    const BoxV3 = await ethers.getContractFactory("BoxV3");

    box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
    boxV2 = await upgrades.upgradeProxy(box.address, BoxV2);
    boxV3 = await upgrades.upgradeProxy(box.address, BoxV3);
  });

  it("should retrieve value previously stored and increment correctly", async function () {
    expect(await boxV2.retrieve()).to.equal(BigNumber.from("42"));
    await boxV3.increment();
    expect(await boxV2.retrieve()).to.equal(BigNumber.from("43"));

    await boxV2.store(100);
    expect(await boxV2.retrieve()).to.equal(BigNumber.from("100"));
  });

  it("should set name correctly in V3", async function () {
    expect(await boxV3.name()).to.equal("");

    const boxname = "BoxV3 Name";
    await boxV3.setName(boxname);
    expect(await boxV3.name()).to.equal(boxname);
  });
});
