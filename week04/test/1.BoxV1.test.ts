import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

// only deploy the box contract, not deploy proxy contract
describe("Box", () => {
  let box: Contract;
  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box");
    box = await Box.deploy();
    await box.deployed();
  });
  it("should retrieve value previously stored", async () => {
    await box.store(42);
    expect(await box.retrieve()).to.equal(BigNumber.from("42"));

    await box.store(100);
    expect(await box.retrieve()).to.equal(BigNumber.from("100"));
  });
});
