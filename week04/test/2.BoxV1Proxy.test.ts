import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";

// through the box contract to deploy the proxy contract
describe("Box (Proxy)", () => {
  let box: Contract;
  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box");
    // Get Box Proxy Contract
    box = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  });

  it("should retrieve value previously stored", async function () {
    // initialize value is 42
    expect(await box.retrieve()).to.equal(BigNumber.from("42"));

    // store 100
    await box.store(100);
    expect(await box.retrieve()).to.equal(BigNumber.from("100"));
  });
});
