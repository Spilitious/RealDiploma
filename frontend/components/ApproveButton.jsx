import { Flex, Button, useToast, Table, Tbody, Thead, Tr, Input, Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { RdaContext } from '@/utils';
import { ethers } from 'ethers';

import { RdaAddress, RdaAbi  } from '@/constants'
import  Browser from './Browser'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'

const ApproveButton = ({amount}) => {
    
        const { contractAddress, contractAbi, getEvents, price, contestDelay, votingDelay } = useContext(RdaContext);
        const [ needApproval, setNeedApproval] = useState(true);
        const [ approval, setApproval] = useState(0);
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
    

        const approve = async () => {
           
            writeContract({ 
                address: RdaAddress, 
                abi: RdaAbi,
                functionName: 'approve', 
                args: [contractAddress, amount]
            })
        };

        const { isSuccess: isConfirmed } = 
        useWaitForTransactionReceipt({ 
            hash, 
        })
    
        useEffect(() => {
            if(isConfirmed) {
                refetch();
                toast({
                    title: "You have successfully approved ".concat(amount/10**18).concat(" tokens"),
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
                    You have successfully approved {approval} tokens",
                </Alert>}
            <Button  isDisabled={isEnable(amount)} colorScheme='teal'  size='md' m={4}  onClick={approve}> Approve </Button>
            
            </>)
    }

export default ApproveButton;


function isEnable(amount) {
    if(amount=='' || isNaN(amount) || amount < 10)
                return true;
    return false;
}