import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Text, Alert, AlertIcon, Td, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'


const GetReward = ({Id}) => {
    
        const { contractAddress, contractAbi, getEvents, refetchAll } = useContext(RdaContext);
        const toast = useToast();
        const { address } = useAccount();

        const [hasVoted, setHasVoted] = useState();
        const [hasClaimed, sethasClaimed] = useState();

        
        const { data: hasVoted1, error: hasVotedError, isPending: hasVotedIsPending} = useReadContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'getHasVotedOnCase',
            args: [Id, address]
        });

                
        useEffect(() => {
            if (hasVotedError) 
                console.log(hasVotedError.message);
      
            else if (hasVoted1) 
                setHasVoted(hasVoted1);
     
        }, [hasVoted1, hasVotedError]);

        const { data: hasClaimed1, error: hasClaimedError, isPending: hasClaimedIsPending, refetch } = useReadContract({
            address: contractAddress,
            abi: contractAbi,
            functionName: 'getHasClaimedOnCase',
            args: [Id, address]
        });

                
        useEffect(() => {
            if (hasClaimedError) 
                console.log(hasClaimedError.message);
      
            else if (hasClaimed1) 
                sethasClaimed(hasClaimed1);
     
        }, [hasClaimed1, hasClaimedError]);


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
                refetch();
                refetchAll()
                toast({
                    title: "Récompenses récupérées avec succès",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }

        }, [isConfirmed])
      
      
        return (
            <>
            {console.log("hasClaimed", hasClaimed)}
            {isConfirmed    
            &&  <Alert mt="1rem" status='success'>
                    <AlertIcon />
                    Récompenses récupérées avec succès
                </Alert>}
                {console.log("hasVoted dans reward", hasVoted)}
                {hasVoted ? (
                <>
                {hasClaimed ? 
                ( <Text>Récompenses récupérées</Text>) :(
                <Button colorScheme='teal'  size='md' m={4}  
                        onClick={getReward}> Récupérer vos récompenses </Button>)}
                        
                </> ) : null}
                
               
                </>
                )
      
      
    }

export default GetReward;
