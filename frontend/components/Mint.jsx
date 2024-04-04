import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { ethers } from 'ethers';

import { RdaNftAddress, RdaNftAbi  } from '@/constants/RdaNft'
import  Browser from './Browser'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { getEventSelector } from 'viem';
// import WorkflowManager from './WorkflowManager';
// import ActionContainer from './ActionContainer';
// import Events from './Events';


const Mint = ({Id}) => {
    
        const { contractAddress, contractAbi, getEvents } = useContext(RdaContext);
        const { address } = useAccount();
        const toast = useToast();
       
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
    

        const mint = async () => {
            writeContract({ 
                address: RdaNftAddress, 
                abi: RdaNftAbi,
                functionName: 'mintDiploma', 
                args: [Id]
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
                    title: "NFT minted successfully",
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
                    Diploma registered successfully.
                </Alert>}
            <Flex 
                justifyContent="space-between"
                alignItems="center"
                width="70%"
                mt="1rem"
                direction="column"
            >
            <Button size="sm" colorScheme='teal' onClick={mint}> Mint your NFT ! </Button>
            </Flex>
            </>)
      
    }

export default Mint;