const hre = require("hardhat");


async function main() {
    
    
    //Deploiemnent de RealDiplomaToken 
    const rda = await hre.ethers.deployContract("RealDiplomaToken");
    await rda.waitForDeployment();
    console.log(`RDA contract has been deployer at ${rda.target}`);
    const [rdaOwner] = await hre.ethers.getSigners();
    console.log(`Owner address: ${rdaOwner.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  