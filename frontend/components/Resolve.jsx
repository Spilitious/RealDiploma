import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Text, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'


const Resolve = ({Id}) => {
    
        const { contractAddress, contractAbi, getEvents } = useContext(RdaContext);
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
    

        const resolve = async () => {
            console.log("Id", Id)
            writeContract({ 
                address: contractAddress, 
                abi: contractAbi,
                functionName: 'resolveAfterVote', 
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
            <Flex 
                justifyContent="space-between"
                alignItems="center"
                width="70%"
                mt="1rem"
                direction="column"
            >
               
                <Box >
                <Text>Le vote est terminé, le gagnant peut clotûrer le dossier</Text>
                <Button colorScheme='teal'  size='md' m={4}  
                        onClick={resolve}> Clôturer le dossier </Button>
                </Box>
                </Flex>
                </>)
      
      
    }

export default Resolve;
