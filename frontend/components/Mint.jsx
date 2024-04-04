import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Alert, AlertIcon, Box, Text } from '@chakra-ui/react';
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


const Mint = ({Owner, Id}) => {
    
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
                    NFT minted successfully.
                </Alert>}
            
            {address == Owner ? (
                <Flex 
                justifyContent="space-between"
                alignItems="center"
                width="70%"
                mt="1rem"
                direction="column"
            >
            <Text> Votre diplôme a été validé, vous pouvez minter votre NFT </Text>
            <Button colorScheme='teal'  size='md' m={4}  onClick={mint}> Mint your NFT ! </Button>
            </Flex>) : ( null)}
            </>)
      
    }

export default Mint;