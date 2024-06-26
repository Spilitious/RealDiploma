const hre = require("hardhat");


async function mint() {
 
    /* **************************************************************** Init **************************************** */

     //Address des contrats 
     const RdaAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";   
     const owner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
     const DiplomaAddress ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
     const DiplomaNftAddress ="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    
     //Contrat Rda
     const Rda = await ethers.getContractFactory('RealDiplomaToken');
     const rda = Rda.attach(RdaAddress);

     
     
     //Contrat DiplomaFile
     const DiplomaFile = await ethers.getContractFactory('DiplomaFile');
     const diplomaFile = DiplomaFile.attach(DiplomaAddress);

     //Contrat DiplomaNft
     const RdaNft = await ethers.getContractFactory('DiplomaNft');
     const rdaNft = Rda.attach(DiplomaNftAddress);
     
     //Récupération des signers Hardhat
     [user0, user1, user2, nonUser1, nonUser2, nonUser3, voter1, voter2, voter3, daoAddress] = await ethers.getSigners();
   
     /* ********************************************************** Execution *********************************************************** */
    
    let ownerBefore = await rdaNft(0);
    console.log("OwnerBefore du NFT 0 : ", ownerBefore)
    await diplomaFile.mintNft(0);
    let ownerAfter = await rdaNft(0);
    console.log("OwnerAfter du NFT 0 : ", ownerAfter)

   
    const [id, lastName, firstName, birthday] = await diplomaNFT.getRdaNft(0);
    console.log("Id : ", id);
    console.log("lastName : ", lastName);
    console.log("firsName : ", firstName);
    console.log("birthday : ", birthday);
    

}


mint().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });