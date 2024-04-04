'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Heading, Box, Table, Thead, Tbody, Tr, Th, TableContainer, Td, Text, Button, useColorModeValue, useToast, Checkbox, CheckboxGroup,Stack,Radio, RadioGroup, HStack } from '@chakra-ui/react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { RdaContext } from '@/utils';
import GetOneDiploma from './GetOneDiploma'; 
import GetOneDip from './GetOneDip';
import { RdaAddress, RdaAbi  } from '@/constants'
import ApproveButton from './ApproveButton';
import { ethers } from 'ethers';

const ContestProof = ({Id}) => {
    const { contractAbi, contractAddress, events, getEvents, price  } = useContext(RdaContext);
    const [selectedProof, setSelectedProof] = useState();
    const [ needApproval, setNeedApproval] = useState(true);
    const [ approval, setApproval] = useState(0);
    

    const handleRadioChange = (index) => {
        
        setSelectedProof(index)
    }
    
    const headTextColor = useColorModeValue("green.500", "green.200");
    const tableBgColor = useColorModeValue("gray.50", "gray.700");
    const hoverBgColor = useColorModeValue("green.100", "teal.800");
    const selectedBgColor = useColorModeValue("green.100", "green.700");
     const toast = useToast();
    const { address } = useAccount();
    

    const { data: allowance, error: allowanceError, isPending :allowanceIsPending, refetch } = useReadContract({
      address: RdaAddress, 
      abi: RdaAbi,
      functionName: 'allowance',
      account: address,
      args : [address, contractAddress]
     
  })

  useEffect(() => {
      if(allowanceError)
          console.log(allowanceError);
      else if(allowanceIsPending) 
          console.log("allowance pending");
      else if(allowance < ethers.parseEther('100'))
         setNeedApproval(true);
      else
      {
          setNeedApproval(false);
          setApproval(Number(allowance))
      }   
  }, [allowance, allowanceIsPending, allowanceError])



    const { data: hash, writeContract } = useWriteContract({
        mutation: {
          onError: (error) => {
            console.log(error);
            toast({
              title: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        },
    });
    

    const dispute = async () => {
        writeContract({ 
            address: contractAddress, 
            abi: contractAbi,
            functionName: 'disputeCase', 
            args: [Id, 0]
        })
    };
    
    const { isSuccess: isConfirmed } = 
        useWaitForTransactionReceipt({ 
            hash, 
        })
    
        useEffect(() => {
            if(isConfirmed) {
                getEvents();
                toast({
                    title: "You disputed tis case successfully with proof ".concat(selectedProof),
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
        }
    }, [isConfirmed])
  

    return (
      
      <Box marginTop={5}>
        <Box marginBottom={5} overflowWrap="break-word" whiteSpace="pre-wrap" >Vous pouvez contester ce diplôme en choisissant une des raisons ci-dessous. Vous devez déposer {Number(price)/(10**18)} tokens en collatéral. Le diplôme sera alors soumis à un vote</Box>
        <RadioGroup colorScheme="teal" value={selectedProof} >
            <Stack direction="column" spacing={3}>
        <Radio value={0} onChange={() => handleRadioChange(0)}>
          Absent de la liste des inscrits
        </Radio>
        <Radio value={1} onChange={() => handleRadioChange(1)}>
          Absent de la liste des diplomés de l'école
        </Radio>
        <Radio value={2} onChange={() => handleRadioChange(2)}>
          impossible, j'le connais il sait même pas compter
        </Radio>
      </Stack>


        </RadioGroup>
        {needApproval ? (
                    <Box>
                    <ApproveButton amount={Number(price)}/>
                    </Box>)
                    : (
                    <Box >
                   <Button isDisabled={getLogic(selectedProof)} colorScheme='teal'  size='md' m={4} onClick={dispute}> Contester </Button>
                    </Box>)
        }              
         </Box>
      );
};

export default ContestProof;

function getLogic(choice) 
{
  if(choice != undefined)
    return false

  return true
}