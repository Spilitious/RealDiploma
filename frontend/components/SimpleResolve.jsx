import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Text, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { ethers } from 'ethers';

import { RdaAddress, RdaAbi  } from '@/constants'
import  Browser from './Browser'
import ApproveButton from './ApproveButton'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { getEventSelector } from 'viem';
// import WorkflowManager from './WorkflowManager';
// import ActionContainer from './ActionContainer';
// import Events from './Events';


const SimpleResolve = ({Owner, Id}) => {
    
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
    

        const simpleResolve = async () => {
            const date = new Date();
            console.log(Math.floor(date.getTime() / 1000));
            writeContract({ 
                address: contractAddress, 
                abi: contractAbi,
                functionName: 'simpleResolve', 
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
                refetchAll();
                toast({
                    title: "Diploma validated successfully",
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
            
            {address == Owner ? (
            <>
            <Text> Aucune contestation n'a été faite, vous pouvez valider votre diplôme et récupérer votre collatéral </Text>
            <Button colorScheme='teal'  size='md' m={4}  onClick={simpleResolve}> Valider </Button>
            </>) : (
            
            <Text>Aucune contestation n'a été faite dans le délai imparti, ce diplôme peut être validé par son propriétaire</Text>
            
               
            )}
        </>
        )
      
    }

export default SimpleResolve;
