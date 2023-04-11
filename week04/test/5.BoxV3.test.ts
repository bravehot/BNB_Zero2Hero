import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

describe("Box V3", () => {
  let boxV3: Contract;

  beforeEach(async () => {
    const BoxV3 = await ethers.getContractFactory("BoxV3");
    boxV3 = await BoxV3.deploy();
    await boxV3.deployed();
  });

  it("should retrieve value previously stored", async function () {
    await boxV3.store(42);
    expect(await boxV3.retrieve()).to.equal(BigNumber.from("42"));

    await boxV3.store(100);
    expect(await boxV3.retrieve()).to.equal(BigNumber.from("100"));
  });

  it("should set name increment value correctly", async function () {
    const boxName = "BoxV3";
    await boxV3.setName(boxName);
    expect(await boxV3.name()).to.equal(boxName);
  });
});
