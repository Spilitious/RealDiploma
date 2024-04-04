import { Flex, Button, useToast, Input, Alert, AlertIcon, Text, Box} from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { ethers } from 'ethers';

import { RdaAddress, RdaAbi  } from '@/constants'
import  Browser from './Browser'

import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract} from 'wagmi'
// import WorkflowManager from './WorkflowManager';
// import ActionContainer from './ActionContainer';
// import Events from './Events';
import ApproveButton from './ApproveButton'

const BecomeVoter = () => {
    
        // const currentDate = new Date(); 
        // const timestamp = Math.floor(currentDate.getTime() / 1000); // Convertir en secondes
        const { contractAddress, contractAbi, getEvents } = useContext(RdaContext);
        const [ tokenAmount, setTokenAmount ]  = useState(0);
        const toast = useToast();
        const { address } = useAccount();
        const [ needApproval, setNeedApproval] = useState(true);
        const [ approval, setApproval] = useState(0);
        const [isEnable, setEnable] = useState()

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
            else if(tokenAmount=='' || isNaN(tokenAmount) || tokenAmount < 10)
                setEnable(true);
            else if(allowance < ethers.parseEther((tokenAmount.toString())))
            {
                setEnable(false);
                setNeedApproval(true);
            }
            else
            {
                setEnable(false);
                setNeedApproval(false);
                setApproval(Number(allowance))
            }   
        }, [allowance, allowanceIsPending, allowanceError, tokenAmount])


        const { data: hash, writeContract } = useWriteContract({
            mutation: {
            // onSuccess: () => {
            //     toast({
    
            //         title: "Proposal submitted... Please wait for confirmation",
            //         status: "success",
            //         duration: 3000,
            //         isClosable: true,
            //     });
            // },
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
    

        const becomeVoter = async () => {
            writeContract({ 
                address: contractAddress, 
                abi: contractAbi,
                functionName: 'becomeVoter', 
                args: [tokenAmount*10**18]
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
                    title: "You have been registered successfully",
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
                    Congrats ! You locked {tokenAmount} tokens and became a voter ! 
                </Alert>}
            <Flex 
                justifyContent="space-between"
                alignItems="center"
                direction="column"
                width="100%"
                mt="1rem"
            >
                <Box marginBotton={30}>Pour devenir électeur, vous devez bloquer un minimum de 10 tokens. Vous pourrez alors voter pour tous les litiges créés après votre inscription</Box>
                <Box marginTop={10} display="flex" alignItems="center">
                <Text marginRight="2" flex="2" >Entrez le nombre de token que vous souhaitez engager</Text>
                <Input flex="1" borderColor="teal.500" borderWidth="2px" placeholder='10' value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} />
                </Box>
                {needApproval ? (
                    <Box>
                    <ApproveButton amount={tokenAmount*10**18}/>
                    </Box>)
                    : (
                    <Box >
                    <Button isDisabled={isEnable} colorScheme='teal'  size='md' m={4}  onClick={becomeVoter}>Submit </Button>
                    </Box>)
                }
            </Flex>
       </>
      )
      
    }

export default BecomeVoter;