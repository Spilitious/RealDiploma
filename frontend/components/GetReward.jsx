import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Text, Alert, AlertIcon, Td, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'


const GetReward = ({Owner, Id}) => {
    
        const { contractAddress, contractAbi, getEvents, refetchAll } = useContext(RdaContext);
        const toast = useToast();
        const { address } = useAccount();
    
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
    

        const getReward = async () => {
            console.log("Id", Id)
            writeContract({ 
                address: contractAddress, 
                abi: contractAbi,
                functionName: 'getRewardFromVote', 
                args: [Number(Id)]
            })
        };
    
        const { isSuccess: isConfirmed } = 
        useWaitForTransactionReceipt({ 
            hash, 
        })
    
        useEffect(() => {
            if(isConfirmed) {
                getEvents();
                refetchAll()
                toast({
                    title: "Récompenses récupéré avec succès",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }

        }, [isConfirmed])
      
      
        return (
            <>
            
            {isConfirmed    
            &&  <Alert mt="1rem" status='success'>
                    <AlertIcon />
                    Diploma validated successfully.
                </Alert>}
                {Owner == address ? (
                <>
               <Tr><Td> <Text>Le vote est en votre faveur </Text></Td>
                <Td><Button colorScheme='teal'  size='md' m={4}  
                        onClick={getReward}> Récupérer ses récompenses </Button>
                
                </Td></Tr></>) :(null)}
                </>
                )
      
      
    }

export default Reward;
