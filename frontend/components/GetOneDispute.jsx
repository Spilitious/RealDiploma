'use client';
import { useState, useEffect, useContext } from 'react';
import {
  Tr,
  Td,
  Spinner,
  Alert,
  AlertIcon, Box, Text,
  useColorModeValue, Button } from '@chakra-ui/react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { RdaContext } from '@/utils';
import Countdown from './Countdown';

const GetOneDispute = ({ Ind }) => {
  //UseContext  
  const { contractAddress, contractAbi, getEvents} = useContext(RdaContext);
  
  //State pour la structure Vote
  const [ owner, setOwner ]  = useState();
  const [ proof, setProof] = useState(0)
  
  //State pour la gestion de la transaction de lecture
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const hoverBgColor = useColorModeValue("green.100", "teal.800");
  const selectedBgColor = useColorModeValue("green.100", "green.700");
  
  console.log("type dispute")
  //Hook de récupération du litige
  const { data: newDispute, error: disputeError, isPending: disputeIsPending } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getDisputeFromCaseIndex',
    args: [Ind]
  });

  

  useEffect(() => {
    if (disputeError) {
      setError(disputeError.message);
      setIsLoading(false);
    } else if (newDispute) {
      setProof(Number(newDispute.Proof));
      setOwner(newDispute.owner);
      setIsLoading(false);
    }
  }, [newDispute, disputeError]);

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
    <Tr height="20px" overflowY="auto">
    <Td style={{ textAlign: 'center' }} >{owner} a contesté ce dossier avec la preuve {proof}</Td></Tr>
    </>
  );
}


export default GetOneDispute;
