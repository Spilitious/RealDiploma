import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { ethers } from 'ethers';
import { RdaAddress, RdaAbi  } from '@/constants'
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract} from 'wagmi'
import ApproveButton from './ApproveButton'
import { Flex, Button, useToast, Input, Alert, AlertIcon, Text, Box} from '@chakra-ui/react';

const BecomeVoter = () => {
        
        const { contractAddress, contractAbi, getEvents, isVoter, voterTokenAmount,  userAllowance, userBalance, refetchAll } = useContext(RdaContext);
        const [ tokenAmount, setTokenAmount ]  = useState(0);
        const toast = useToast();
        const { address } = useAccount();
        const [ needApproval, setNeedApproval] = useState(true);
        const [ approval, setApproval] = useState(0);
        const [isEnable, setEnable] = useState()
        
        /*
        const { data: allowance, error: allowanceError, isPending :allowanceIsPending, refetch } = useReadContract({
            address: RdaAddress, 
            abi: RdaAbi,
            functionName: 'allowance',
            account: address,
            args : [address, contractAddress]
        })
        */
        useEffect(() => {
            if(tokenAmount=='' || isNaN(tokenAmount) || tokenAmount < 10)
                setEnable(true);
            else
                setEnable(false);
         
        }, [tokenAmount])
        

         
        

        const { data: hash, writeContract, writeContractAsync } = useWriteContract({
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
    
        const becomeVoter = async () => {
            if(userAllowance < tokenAmount) {
                await writeContractAsync({
                    address: RdaAddress, 
                    abi: RdaAbi,
                    functionName: 'approve', 
                    args: [contractAddress, tokenAmount*10**18]
                })}

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
                refetchAll();
               
                toast({
                    title: "Vous êtes enregistré avec suscès",
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
                    Félicitations ! You avez bloqué {tokenAmount} tokens et vous ête maintenant un juré ! 
                </Alert>}
            
            {isVoter ? (
            <Box   bg="gray.200"
            // bgGradient="linear(to-b, gray.100, white)"
            borderColor="teal.500" borderWidth="2px" marginBotton={30}>Vous êtes un juré avec {Number(voterTokenAmount)/10**18} tokens bloqués  </Box>)
            : (
            <Flex key={isVoter}
                justifyContent="space-between"
                alignItems="center"
                direction="column"
                width="80%"
                mt="1rem"
                bg="gray.200"
                borderColor="teal.500" 
                borderWidth="2px"
               
            >
                <Box marginTop={10} marginBotton={30}>Pour devenir électeur, vous devez bloquer un minimum de 10 tokens. Vous pourrez alors voter pour tous les litiges créés après votre inscription</Box>
                <Box marginTop={10} display="flex" alignItems="center">
                <Text marginRight="2" flex="2" >Entrez le nombre de token que vous souhaitez engager</Text>
                <Input flex="1" borderColor="teal.500" borderWidth="2px" placeholder='10' value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} />
                </Box>
                <Button isDisabled={isEnable} colorScheme='teal'  size='md' m={4}  onClick={becomeVoter}> Valider </Button>
            </Flex>)}
       </>
      )
      
    }

export default BecomeVoter;