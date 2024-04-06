const hre = require("hardhat");

const dao = "0xb2495f0f4A8a02e36b1C45860003be3A6C7A01AB"
const RealDiplomaToken = "0x77aaAD3Aea730f733f06160a2e703e5ED3624ae7";
const DiplomaFile = "0x8c6f27F64FC25FE22558a195B37d11E9a4FB2Edf"
const DiplomaNft = "0x9C77748D4D60D8871776A18ed36B093A65816c17"

const contractsToVerify = [
  { address: RealDiplomaToken, constructorArguments: [] },
  { address: DiplomaFile, constructorArguments: [RealDiplomaToken, dao] },
  { address: DiplomaNft, constructorArguments: [DiplomaFile] },
];

async function main() {
  for (const contract of contractsToVerify) {
    await hre.run("verify:verify", {
      address: contract.address,
      constructorArguments: contract.constructorArguments,
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});