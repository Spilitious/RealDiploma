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
import { useReadContract } from 'wagmi';
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

import { resolve } from 'styled-jsx/css';

const GetOneDiploma = ({ Id }) => {

  //UseContest
  const { contractAddress, contractAbi, contestDelay, votingDelay, selectedCase, setSelectedCase} = useContext(RdaContext);
  
  //useState pour la structrure File
  const [owner, setOwner] = useState("");
  const [creationTime, setCreationTime] = useState(0);
  const [status, setStatus] = useState(0);
  const [action, setAction] = useState(0)
  
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

 

  

  
  const { data: newDiploma, error: diplomaError, isPending: diplomaIsPending } = useReadContract({
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
    <Box   > 
      {/* _hover={{ bg : hoverBgColor  }} */}
       
        <Tr textAlign="center" fontSize="xl" color="teal.500" fontWeight="bold" borderColor="teal.500" borderWidth="2px"> Diplôme n° {Number(Id)+1} </Tr>
        <Tr width='1000px'><GetOneDip  key={Id} Ind={Id} /></Tr>
        <Tr width='100%'>
        <Td width='33%' borderColor="teal.500" borderWidth="2px">{owner}</Td>
        <Td width='33%' borderColor="teal.500" borderWidth="2px" style={{ textAlign: 'center' }} isNumeric>{getStatus(status)}</Td>
        <Td width='33%' borderColor="teal.500" borderWidth="2px" style={{ textAlign: 'center' }} isNumeric>{getDate(creationTime)}</Td>
        </Tr>

        <Box>
            {getAction(status, creationTime, contestDelay, votingDelay) == 1 ? <Countdown titre={"Temps à avant validation automatique"} duration={getDuration(creationTime, contestDelay)}/> :  null}
            
           

        </Box>
        <Box>
            {getAction(status, creationTime, contestDelay, votingDelay) == 1 ? <ContestProof Id={Id} /> : null}
            {getAction(status, creationTime, contestDelay, votingDelay) == 0 ? <SimpleResolve Owner={owner} Id={Id}/> :  null}
            {getAction(status, creationTime, contestDelay, votingDelay) == 3 ? <GetOneVote Ind={Id} /> : null}
            {getAction(status, creationTime, contestDelay, votingDelay) == 2 ? <Mint Owner={owner} Id={Id} /> : null }
            {getAction(status, creationTime, contestDelay, votingDelay) == 4 ? <Box><GetOneVote Ind={Id} /><Resolve Id={Id}/></Box> : null}
           

        </Box>
            <Box>
            {/* {true ? <GetOneVote Ind={event.index} /> : null} */}
            </Box>
        
    </Box>
  );
}


export default GetOneDiploma;


function getStatus(id) {
    switch(id) {
        case 0 : return "Pending";
        case 1 : return "Validated";
        case 2 : return "Disputed";
        case 3 : return "Rejected";
        default : return "Unknown";
    }
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);

  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  
  // Formater la date en chaîne de caractères
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
  }

  const getAction = (status, creationTime, contestDelay, votingDelay) => {
    const timestamp = Date.now()/1000;

    // console.log(creationTime);
    // console.log(contestDelay);
    // console.log(timestamp);
    if(status ==0) {
      
      if((creationTime + Number(contestDelay)) < timestamp)
        return 0;
        
      if((creationTime + Number(contestDelay))>= timestamp)
       return 1;
    }
  
    if(status ==1 )
      return 2;
    
    if(status ==2) {
      
        if((creationTime + Number(votingDelay)) >= timestamp)
         return 3;
   
        if((creationTime + Number(contestDelay)) <= timestamp)
         return 4;
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

  