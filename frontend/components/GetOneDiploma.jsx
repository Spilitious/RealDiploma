'use client';
import { useState, useEffect, useContext } from 'react';
import {
  Tr,
  Td,
  Table,
  Spinner,
  Alert,
  AlertIcon, Head,
  Box,
  Button,
  useColorModeValue } from '@chakra-ui/react';
import { useReadContract, useAccount } from 'wagmi';
import { RdaContext } from '@/utils';
import GetOneDip from './GetOneDip';
import ContestProof from './ContestProof';
import GetOneVote from './GetOneVote';
import Mint from './Mint';
import Countdown from './Countdown' 
import SimpleResolve from './SimpleResolve'
import Resolve from './Resolve'
import { confluxESpaceTestnet, mintSepoliaTestnet } from 'viem/chains';
import BecomeVoter from './BecomeVoter';
import GetOneDispute from './GetOneDispute';
import GetReward from "./GetReward";

const GetOneDiploma = ({ Id }) => {

  //UseContest
  const { contractAddress, contractAbi, contestDelay, votingDelay, selectedCase, setSelectedCase, isVoter, refresh} = useContext(RdaContext);
  
  //useState pour la structrure File
  const [owner, setOwner] = useState("");
  const [creationTime, setCreationTime] = useState(0);
  const [status, setStatus] = useState(0);
  const [action, setAction] = useState(0)
  const { address } = useAccount();
  
  const [diplomaIndex, setDiplomaIndex] = useState(0);

  //useState pour la gestion du chargement du Case
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const hoverBgColor = useColorModeValue("green.100", "teal.800");
  const selectedBgColor = useColorModeValue("green.100", "green.700");

 


   //Gestion du clique sur un diplome
   const handleRowClick = (rowNumber) => {
    setSelectedCase(rowNumber);
    
   }

 

  

  
  const { data: newDiploma, error: diplomaError, isPending: diplomaIsPending, refetch } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getCase',
    args: [Id]
  });


  useEffect(() => {
    if (diplomaError) {
      setError(diplomaError.message);
      setIsLoading(false);
    } else if (newDiploma) {
      setOwner(newDiploma.owner);
      setCreationTime(Number(newDiploma.creationTime));
      setStatus(Number(newDiploma.status));
      setIsLoading(false);
      
      
    }
  }, [newDiploma, diplomaError]);

  useEffect(() => {
    console.log("refetch")
      refetch();
  }, [refresh]);

  if (isLoading) {
    return (
      <Tr>
        <Td colSpan="2">
          <Spinner />
        </Td>
      </Tr>
    );
  }

  if (error) {
    return (
      <Tr>
        <Td colSpan="2">
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Td>
      </Tr>
    );
  }

  return (
    <> 
      {refresh }
     
       
       
        <Table >
        <Tr><GetOneDip width="100%" key={Id} Ind={Id} /></Tr>
        <Tr>
        <Td  colSpan={4} textAlign="center" borderColor="teal.500" borderWidth="2px">{owner}</Td>
        <Td  borderColor="teal.500" borderWidth="2px" style={{ textAlign: 'center' }} isNumeric>{getDate(creationTime)}</Td>
        <Td  borderColor="teal.500" borderWidth="2px" style={{ textAlign: 'center' }} isNumeric>{getStatus(status)}</Td>
        </Tr>

        <Tr>
            {getAction(status, creationTime, contestDelay, votingDelay) == 1 ? <Td colSpan={4}><ContestProof Id={Id} /></Td> : null}
            {getAction(status, creationTime, contestDelay, votingDelay) == 1 ? <Td colSpan={2}><Countdown titre={"Temps avant validation automatique"} duration={getDuration(creationTime, contestDelay)}/> </Td> :  null}
        
            {getAction(status, creationTime, contestDelay, votingDelay) == 0 ?  <Td colSpan={6} textAlign="center"><SimpleResolve Owner={owner} Id={Id}/></Td> :  null} 
         
            {(getAction(status, creationTime, contestDelay, votingDelay) == 2 && owner==address)? <Td colSpan={4} textAlign="center"><Mint Owner={owner} Id={Id} /></Td> : null }
            {((getAction(status, creationTime, contestDelay, votingDelay) == 2 && isVoter))? <Td colSpan={2} textAlign="center"><GetReward  Id={Id} /></Td> : null }
        
            {getAction(status, creationTime, contestDelay, votingDelay) == 3 ? <Td colSpan={6}><GetOneVote Owner={owner} Ind={Id} /></Td> : null}

         
            
           
        </Tr>
       
            
           
           
           
            {/* {getAction(status, creationTime, contestDelay, votingDelay) == 4 ? <Box><GetOneVote Ind={Id} /><Resolve Id={Id}/></Box> : null} */}
            

        {/* </Box> */}
            {/* // <Box> */}
            {/* {true ? <GetOneVote Ind={event.index} /> : null} */}
            {/* </Box> */}
        </Table>
    </>
  );
}


export default GetOneDiploma;


function getStatus(id) {
    switch(id) {
        case 0 : return "En cours";
        case 1 : return "Validé";
        case 2 : return "Contesté";
        case 3 : return "Rejecté";
        default : return "Unknown";
    }
}
function getDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro devant si le jour est inférieur à 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si le mois est inférieur à 10
  const year = date.getFullYear();
  
  // Formater la date en chaîne de caractères
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
  }

  const getAction = (status, creationTime, contestDelay, votingDelay) => {
    const timestamp = Date.now()/1000;

    // console.log(creationTime);
    // console.log(contestDelay);
    // console.log(timestamp);
    if(status ==0) {
      
      if((creationTime + Number(contestDelay)) < timestamp)
        return 0;  // peut être constesté
        
      if((creationTime + Number(contestDelay))>= timestamp)
       return 1; //  ne plus être contesté, peut être validé par son proprio
    }
  
    if(status ==1 )
      return 2;

    if(status == 3)
      return 4;

    if(status ==2) {
        return 3;
      /*
        if((creationTime + Number(votingDelay)) >= timestamp)
         return 3;
   
        if((creationTime + Number(votingDelay)) < timestamp)
         return 4;  */
    }
  };

function getActionText(status, creationTime, votingDelay, contestDelay) {
  const timestamp = Date.now();
  if(status ==0) {
    if((creationTime + Number(contestDelay)) < timestamp)
       return "resolve1";
      
    if((creationTime + Number(contestDelay))>= timestamp)
          return "contest";
  }

  if(status ==1 )
      return "mint NFT";
  
  if(status ==2) {
      if((creationTime + Number(votingDelay)) < timestamp)
         return "vote";
 
      if((creationTime + Number(contestDelay))>= timestamp)
         return "resolve2";
  }
  
 

  return("puting")
  }

  function getDuration(creationTime, contestDelay)
  {
    const timestamp = Date.now()/1000;
    // console.log("creation", creationTime)
    // console.log("delay", Number(contestDelay))
    // console.log("heure", timestamp);
    return (creationTime+ Number(contestDelay) - timestamp);
  }

  